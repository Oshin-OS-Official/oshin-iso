import customtkinter as ctk
from tkinter import filedialog, messagebox
from tkcalendar import Calendar
import json
from PIL import Image, ImageTk
import os


class SahayakApp:
    def __init__(self, root, font):
        self.root = root
        self.root.title("Sahayak Cyberbullying Reporting Application")
        self.root.geometry("780x560")

        self.font = font
        self.data = {}

        self.image = ctk.CTkImage(dark_image=Image.open('/usr/local/bin/sahayak/imgs/header.png'), size=(760, 100))

        # Create a frame for the form
        self.frame = ctk.CTkFrame(root)
        self.frame.pack(padx=10, pady=10, fill="both", expand=True)

        self.image_label = ctk.CTkLabel(self.frame, image=self.image, text="")
        self.image_label.grid(row=0, column=0, columnspan=7)

        # Create the labels and entry fields
        self.create_name_entry()
        self.create_age_entry()
        self.create_gender_entry()
        self.create_email_entry("Email:", row=2, column=0, colspan=5)
        self.create_date_picker("Date:", row=3, column=0)
        self.create_time_entry("Time:", row=3, column=1)
        self.create_platform_dropdown("Platform:", ["Select", "Facebook", "Instagram", "Twitter", "Other"], row=3,
                                      column=2)
        self.create_description_entry("A Description \nof the incident:", row=4, column=0, height=5, colspan=5)
        self.create_type_dropdown("Type of Crime:", ["Harassment", "Threats", "Impersonation", "Other"], row=6,
                                  column=0)
        self.create_frequency_dropdown("Frequency:", ["One-time", "Repeated"], row=6, column=2)
        self.create_actions_taken_entry("Actions Taken:", row=7, column=0, height=4, colspan=5)
        self.consent_var = ctk.IntVar()
        self.consent_checkbox = ctk.CTkCheckBox(self.frame,
                                                text="Consent to share information with appropriate parties",
                                                variable=self.consent_var)
        self.consent_checkbox.grid(row=8, column=0, columnspan=3, padx=(20, 5), pady=5, sticky="w")
        self.submit_button = ctk.CTkButton(self.frame, text="Submit Report", hover_color='green',
                                           command=self.submit_report)
        self.submit_button.grid(row=9, column=0, columnspan=7, pady=10)

    def create_name_entry(self):
        label = ctk.CTkLabel(self.frame, text="Name:", font=self.font)
        label.grid(row=1, column=0, padx=(20, 5), pady=5, sticky="w")
        entry = ctk.CTkEntry(self.frame)
        entry.grid(row=1, column=1, pady=5, padx=5, sticky="ew")
        self.name_entry = entry

    def create_age_entry(self):
        label = ctk.CTkLabel(self.frame, text="Age:", font=self.font)
        label.grid(row=1, column=2, padx=5, pady=5, sticky="w")
        entry = ctk.CTkEntry(self.frame, font=self.font)
        entry.grid(row=1, column=3, pady=5, padx=5, sticky="ew")
        self.age_entry = entry

    def create_gender_entry(self):
        label = ctk.CTkLabel(self.frame, text="Gender:", font=self.font)
        label.grid(row=1, column=4, padx=5, pady=5, sticky="w")
        entry = ctk.CTkEntry(self.frame, font=self.font)
        entry.grid(row=1, column=5, pady=5, padx=5, sticky="ew")
        self.gender_entry = entry

    def create_email_entry(self, label_text, row, column, height=1, colspan=1):
        label = ctk.CTkLabel(self.frame, text=label_text, font=self.font)
        label.grid(row=row, column=column * 2, padx=(20, 5), pady=5, sticky="w")
        entry = ctk.CTkEntry(self.frame, height=height * 20, font=self.font)
        entry.grid(row=row, column=column * 2 + 1, pady=5, padx=5, columnspan=colspan, sticky="ew")
        setattr(self, label_text.split()[0].lower() + "_entry", entry)
        self.email_entry = entry

    def create_date_picker(self, label_text, row, column):
        label = ctk.CTkLabel(self.frame, text=label_text)
        label.grid(row=row, column=column * 2, padx=(20, 5), pady=5, sticky="w")
        self.date_button = ctk.CTkButton(self.frame, text="Select Date", command=self.select_date)
        self.date_button.grid(row=row, column=column * 2 + 1, pady=5, padx=5, sticky="ew")
        self.selected_date = None

    def select_date(self):
        top = ctk.CTkToplevel(self.root)
        top.transient(self.root)
        top.title("Select Date")
        cal = Calendar(top, selectmode='day', year=2024, month=6, day=2)
        cal.pack(pady=10)

        def grab_date():
            self.selected_date = cal.selection_get()
            self.date_button.configure(text=self.selected_date)
            top.destroy()

        ctk.CTkButton(top, text="Select", command=grab_date).pack(pady=10)

    def create_time_entry(self, label_text, row, column, height=1, colspan=1):
        label = ctk.CTkLabel(self.frame, text=label_text, font=self.font)
        label.grid(row=row, column=column * 2, padx=(20, 5), pady=5, sticky="w")
        entry = ctk.CTkEntry(self.frame, height=height * 20, font=self.font)
        entry.grid(row=row, column=column * 2 + 1, pady=5, padx=5, columnspan=colspan, sticky="ew")
        setattr(self, label_text.split()[0].lower() + "_entry", entry)
        self.time_entry = entry

    def create_platform_dropdown(self, label_text, options, row, column):
        label = ctk.CTkLabel(self.frame, text=label_text)
        label.grid(row=row, column=column * 2, padx=5, pady=5, sticky="w")
        dropdown = ctk.CTkComboBox(self.frame, values=options)
        dropdown.grid(row=row, column=column * 2 + 1, pady=5, padx=5, sticky="ew")
        setattr(self, label_text.split()[0].lower() + "_dropdown", dropdown)
        self.platform_dropdown = dropdown  # Save the dropdown widget

    def create_description_entry(self, label_text, row, column, height=1, colspan=1):
        label = ctk.CTkLabel(self.frame, text=label_text, font=self.font)
        label.grid(row=row, column=column * 2, padx=(20, 5), pady=5, sticky="w")
        entry = ctk.CTkTextbox(self.frame, height=height * 20, font=self.font)
        entry.grid(row=row, column=column * 2 + 1, pady=5, padx=5, columnspan=colspan, sticky="ew")
        setattr(self, label_text.split()[0].lower() + "_entry", entry)
        self.description_entry = entry

    def create_type_dropdown(self, label_text, options, row, column):
        label = ctk.CTkLabel(self.frame, text=label_text)
        label.grid(row=row, column=column * 2, padx=(20, 5), pady=5, sticky="w")
        dropdown = ctk.CTkComboBox(self.frame, values=options)
        dropdown.grid(row=row, column=column * 2 + 1, pady=5, padx=5, sticky="ew")
        setattr(self, label_text.split()[0].lower() + "_dropdown", dropdown)
        self.type_dropdown = dropdown  # Save the dropdown widget

    def create_frequency_dropdown(self, label_text, options, row, column):
        label = ctk.CTkLabel(self.frame, text=label_text)
        label.grid(row=row, column=column * 2, padx=5, pady=5, sticky="w")
        dropdown = ctk.CTkComboBox(self.frame, values=options)
        dropdown.grid(row=row, column=column * 2 + 1, pady=5, padx=5, sticky="ew")
        setattr(self, label_text.split()[0].lower() + "_dropdown", dropdown)
        self.frequency_dropdown = dropdown  # Save the dropdown widget

    def create_actions_taken_entry(self, label_text, row, column, height=1, colspan=1):
        label = ctk.CTkLabel(self.frame, text=label_text, font=self.font)
        label.grid(row=row, column=column * 2, padx=(20, 5), pady=5, sticky="w")
        entry = ctk.CTkTextbox(self.frame, height=height * 20, font=self.font)
        entry.grid(row=row, column=column * 2 + 1, pady=5, padx=5, columnspan=colspan, sticky="ew")
        setattr(self, label_text.split()[0].lower() + "_entry", entry)
        self.actions_taken_entry = entry

    def clear_entries(self):
        # Clear all entry fields
        self.name_entry.delete(0, 'end')
        self.age_entry.delete(0, 'end')
        self.gender_entry.delete(0, 'end')
        self.email_entry.delete(0, 'end')
        self.date_button.configure(text="Select Date")
        self.selected_date = None
        self.time_entry.delete(0, 'end')
        self.platform_dropdown.set("Select")
        self.description_entry.delete("1.0", "end")
        self.type_dropdown.set("Select")
        self.frequency_dropdown.set("Select")
        self.actions_taken_entry.delete("1.0", "end")
        self.consent_checkbox.deselect()

    def submit_report(self):
        self.save_input_data()
        self.clear_entries()
        messagebox.showinfo("Report Saved", "Your report has been saved. We will be updating sahayak to send reports real time.")

    def gather_input_data(self):
        self.data['Name'] = self.name_entry.get()
        self.data['Age'] = self.age_entry.get()
        self.data['Gender'] = self.gender_entry.get()
        self.data['Email'] = self.email_entry.get()
        self.data['Date'] = self.selected_date.strftime('%Y-%m-%d') if self.selected_date else ""
        self.data['Time'] = self.time_entry.get()
        self.data['Platform'] = self.platform_dropdown.get() if self.platform_dropdown.get() != "Select" else ""
        self.data['Description'] = self.description_entry.get("1.0", "end-1c")
        self.data['Type of Crime'] = self.type_dropdown.get() if self.type_dropdown.get() != "Select" else ""
        self.data['Frequency'] = self.frequency_dropdown.get() if self.frequency_dropdown.get() != "Select" else ""
        self.data['Action Taken'] = self.description_entry.get("1.0", "end-1c")
        self.data['Consent'] = "Yes" if self.consent_var.get() == 1 else "No"

    def print_input_data_as_json(self):
        self.gather_input_data()
        json_data = json.dumps(self.data, indent=4)
        print(json_data)

    def save_input_data(self):
        self.gather_input_data()
        json_data = json.dumps(self.data, indent=4)
        filename = "/usr/local/bin/reports/report.json"
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        with open(filename, "w") as f:
            f.write(json_data)

if __name__ == "__main__":
        root = ctk.CTk()
        ico = Image.open('/usr/local/bin/oshin/icons/oshin-official-icon.png')
        photo = ImageTk.PhotoImage(ico)
        root.wm_iconphoto(False, photo)
        my_font = ctk.CTkFont(family="Poppins", size=12, weight="bold")
        SahayakApp(root, font=my_font)
        root.mainloop()
