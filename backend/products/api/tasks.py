
import csv
from io import StringIO
from django.conf import settings
from celery import shared_task
from products.models import Order
import os


@shared_task
def generate_order_report():
    print("spet2...................................")  
    orders = Order.objects.all()

    # Create a CSV file
    csv_buffer = StringIO()
    csv_writer = csv.writer(csv_buffer)
    csv_writer.writerow(['Invoice Number', 'Invoice Date', 'Total Price', 'Status'])

    for order in orders:
        csv_writer.writerow([order.invoice_number, order.invoice_date, order.total_price, order.status])

    # Save CSV file
    file_path = os.path.join(settings.MEDIA_ROOT, 'order_report.csv')
    print("file path.........",file_path)
    with open(file_path, 'w') as csv_file:
        csv_file.write(csv_buffer.getvalue())

    return 'order_report.csv' 