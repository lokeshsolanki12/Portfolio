"""
Flask backend for Lokesh Solanki's portfolio website.
Serves multi-page HTML, stores contact submissions in MySQL,
and sends email notifications to your inbox.
"""

import os
import re
import smtplib
from datetime import datetime
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

import mysql.connector
from dotenv import load_dotenv
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "dev-secret-key")

# Enable CORS for local development
CORS(app, resources={r"/contact": {"origins": "*"}})

# Page route mapping — each navbar link is a separate page
PAGES = {
    "index": {"template": "index.html", "title": "Home", "active": "home"},
    "about": {"template": "about.html", "title": "About Me", "active": "about"},
    "skills": {"template": "skills.html", "title": "Skills & Tools", "active": "skills"},
    "experience": {
        "template": "experience.html",
        "title": "Experience",
        "active": "experience",
    },
    "projects": {"template": "projects.html", "title": "Projects", "active": "projects"},
    "certificates": {
        "template": "certificates.html",
        "title": "Certificates & Achievements",
        "active": "certificates",
    },
    "contact": {"template": "contact.html", "title": "Contact", "active": "contact"},
}

EMAIL_PATTERN = re.compile(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")


def get_db_connection():
    """Create and return a MySQL database connection."""
    return mysql.connector.connect(
        host=os.getenv("DB_HOST", "localhost"),
        user=os.getenv("DB_USER", "root"),
        password=os.getenv("DB_PASSWORD", ""),
        database=os.getenv("DB_NAME", "portfolio_db"),
        port=int(os.getenv("DB_PORT", 3306)),
    )


def send_contact_email(name, email, subject, message):
    """
    Send a notification email when someone submits the contact form.
    Returns True on success, False if email is not configured or sending fails.
    """
    mail_host = os.getenv("MAIL_HOST")
    mail_port = int(os.getenv("MAIL_PORT", "587"))
    mail_user = os.getenv("MAIL_USERNAME")
    mail_password = os.getenv("MAIL_PASSWORD")
    mail_receiver = os.getenv("MAIL_RECEIVER") or mail_user

    if not all([mail_host, mail_user, mail_password, mail_receiver]):
        app.logger.warning("Email not configured — message saved to DB only.")
        return False

    msg = MIMEMultipart()
    msg["Subject"] = f"Portfolio Contact: {subject}"
    msg["From"] = mail_user
    msg["To"] = mail_receiver
    msg["Reply-To"] = email

    body = (
        f"New message from your portfolio contact form\n"
        f"{'=' * 44}\n\n"
        f"Name:    {name}\n"
        f"Email:   {email}\n"
        f"Subject: {subject}\n\n"
        f"Message:\n{message}\n\n"
        f"{'-' * 44}\n"
        f"Received: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n"
        f"Reply directly to this email to respond to {name}."
    )
    msg.attach(MIMEText(body, "plain"))

    try:
        with smtplib.SMTP(mail_host, mail_port, timeout=15) as server:
            server.ehlo()
            server.starttls()
            server.ehlo()
            server.login(mail_user, mail_password)
            server.sendmail(mail_user, mail_receiver, msg.as_string())
        app.logger.info("Contact notification email sent to %s", mail_receiver)
        return True
    except smtplib.SMTPException as exc:
        app.logger.error("Email error: %s", exc)
        return False


def render_page(page_key):
    """Render a page template with shared context."""
    page = PAGES[page_key]
    return render_template(
        page["template"],
        page_title=page["title"],
        active_page=page["active"],
    )


@app.route("/")
def home():
    return render_page("index")


@app.route("/about")
def about():
    return render_page("about")


@app.route("/skills")
def skills():
    return render_page("skills")


@app.route("/experience")
def experience():
    return render_page("experience")


@app.route("/projects")
def projects():
    return render_page("projects")


@app.route("/certificates")
def certificates():
    return render_page("certificates")


@app.route("/contact")
def contact():
    return render_page("contact")


def validate_contact_payload(data):
    """Validate contact form fields server-side. Returns (is_valid, error_message)."""
    if not data:
        return False, "No data received."

    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    subject = (data.get("subject") or "").strip()
    message = (data.get("message") or "").strip()

    if not name or len(name) > 100:
        return False, "Please enter a valid name (max 100 characters)."

    if not email or len(email) > 150 or not EMAIL_PATTERN.match(email):
        return False, "Please enter a valid email address."

    if not subject or len(subject) > 200:
        return False, "Please enter a subject (max 200 characters)."

    if not message or len(message) > 5000:
        return False, "Please enter a message (max 5000 characters)."

    return True, None


@app.route("/contact", methods=["POST"])
def submit_contact():
    """Handle contact form submission — validate and store in MySQL."""
    data = request.get_json(silent=True)
    is_valid, error_message = validate_contact_payload(data)

    if not is_valid:
        return jsonify({"status": "error", "message": error_message}), 400

    name = data["name"].strip()
    email = data["email"].strip()
    subject = data["subject"].strip()
    message = data["message"].strip()

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO contact_messages (name, email, subject, message)
            VALUES (%s, %s, %s, %s)
            """,
            (name, email, subject, message),
        )
        conn.commit()
        cursor.close()
        conn.close()
    except mysql.connector.Error as exc:
        app.logger.error("Database error: %s", exc)
        return (
            jsonify(
                {
                    "status": "error",
                    "message": "Unable to save your message. Please try again later.",
                }
            ),
            500,
        )

    email_sent = send_contact_email(name, email, subject, message)
    if not email_sent:
        app.logger.warning(
            "Message saved for %s but email notification was not sent.", email
        )

    return jsonify({"status": "success"})


if __name__ == "__main__":
    app.run(debug=os.getenv("FLASK_ENV") == "development", host="0.0.0.0", port=5000)
