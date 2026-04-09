from flask import Blueprint, request, jsonify
from app.config.db import get_db_connection
import smtplib
from email.mime.text import MIMEText

contact_bp = Blueprint("contact_bp", __name__)


@contact_bp.route("/contact", methods=["POST"])
def contact():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    if not name or not email or not message:
        return jsonify({"success": False, "message": "All fields required"}), 400

    # Save to PostgreSQL
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO contact (name, email, message) VALUES (%s, %s, %s)",
        (name, email, message),
    )

    conn.commit()
    conn.close()

    # SEND EMAIL ALERT
    sender_email = "lokesh.solanki7014@gmail.com"
    sender_password = "ccubeobwrxtupovv"

    msg = MIMEText(
        f"New Portfolio Contact Message\n\n"
        f"Name: {name}\n"
        f"Email: {email}\n"
        f"Message: {message}"
    )

    msg["Subject"] = "New Portfolio Contact Alert"
    msg["From"] = sender_email
    msg["To"] = sender_email

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(msg)
        server.quit()

    except Exception as e:
        print("Email sending failed:", e)

    return jsonify({
        "success": True,
        "message": "Message saved successfully"
    })


@contact_bp.route("/messages", methods=["GET"])
def get_messages():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM contact ORDER BY id DESC")
    rows = cursor.fetchall()

    messages = []
    for row in rows:
        messages.append({
            "id": row[0],
            "name": row[1],
            "email": row[2],
            "message": row[3],
        })

    conn.close()
    return jsonify(messages)