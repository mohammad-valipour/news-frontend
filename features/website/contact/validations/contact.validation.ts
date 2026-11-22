import {ContactFormErrors, ContactFormValues} from "@/features/website/contact/types/contact.types";

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
    const errors: ContactFormErrors = {};

    if (!values.name.trim()) {
        errors.name = "وارد کردن نام الزامی است.";
    } else if (values.name.trim().length < 3) {
        errors.name = "نام باید حداقل ۳ کاراکتر باشد.";
    }

    if (!values.email.trim()) {
        errors.email = "وارد کردن ایمیل الزامی است.";
    } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
    ) {
        errors.email = "فرمت ایمیل صحیح نیست.";
    }

    if (!values.subject.trim()) {
        errors.subject = "موضوع پیام را وارد کنید.";
    }

    if (!values.message.trim()) {
        errors.message = "متن پیام را وارد کنید.";
    } else if (values.message.trim().length < 10) {
        errors.message = "متن پیام باید حداقل ۱۰ کاراکتر باشد.";
    }

    return errors;
}
