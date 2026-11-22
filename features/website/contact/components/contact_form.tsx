"use client";

import {useState, type FormEvent} from "react";
import {Send} from "lucide-react";

import type {
    ContactFormValues,
    ContactFormErrors,
} from "../types/contact.types";

import {validateContactForm} from "../validations/contact.validation";

interface ContactFormProps {
    recipientEmail: string;
}

const initialValues: ContactFormValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
};

export default function ContactForm({
                                        recipientEmail,
                                    }: ContactFormProps) {
    const [values, setValues] = useState<ContactFormValues>(
        initialValues
    );

    const [errors, setErrors] = useState<ContactFormErrors>({});

    function handleChange(
        field: keyof ContactFormValues,
        value: string
    ) {
        setValues((previous) => ({
            ...previous,
            [field]: value,
        }));

        setErrors((previous) => ({
            ...previous,
            [field]: undefined,
        }));
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const validationErrors = validateContactForm(values);

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        const subject = encodeURIComponent(values.subject);

        const body = encodeURIComponent(
            `نام: ${values.name}\n` +
            `ایمیل: ${values.email}\n\n` +
            `متن پیام:\n${values.message}`
        );

        const mailtoUrl =
            `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

        window.location.href = mailtoUrl;
    }

    const inputClass =
        "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10";

    return (
        <section
            id="contact-form"
            className="rounded-3xl border border-border bg-surface p-5 sm:p-8"
        >
            <div className="mb-8">
                <h2 className="text-xl font-bold text-foreground">
                    پیام خود را برای ما ارسال کنید
                </h2>

                <p className="mt-3 text-sm leading-8 text-muted-foreground">
                    اطلاعات زیر را تکمیل کنید تا پیام شما آماده ارسال شود.
                </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">

                <div className="grid gap-5 sm:grid-cols-2">

                    <div className="space-y-2">
                        <label
                            htmlFor="contact-name"
                            className="text-sm font-medium text-foreground"
                        >
                            نام و نام خانوادگی
                        </label>

                        <input
                            id="contact-name"
                            type="text"
                            value={values.name}
                            onChange={(event) =>
                                handleChange("name", event.target.value)
                            }
                            placeholder="نام خود را وارد کنید"
                            className={inputClass}
                            aria-invalid={Boolean(errors.name)}
                            aria-describedby={
                                errors.name ? "contact-name-error" : undefined
                            }
                        />

                        {errors.name && (
                            <p
                                id="contact-name-error"
                                className="text-xs text-danger"
                            >
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="contact-email"
                            className="text-sm font-medium text-foreground"
                        >
                            آدرس ایمیل
                        </label>

                        <input
                            id="contact-email"
                            type="email"
                            dir="ltr"
                            value={values.email}
                            onChange={(event) =>
                                handleChange("email", event.target.value)
                            }
                            placeholder="example@email.com"
                            className={inputClass}
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={
                                errors.email ? "contact-email-error" : undefined
                            }
                        />

                        {errors.email && (
                            <p
                                id="contact-email-error"
                                className="text-xs text-danger"
                            >
                                {errors.email}
                            </p>
                        )}
                    </div>

                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="contact-subject"
                        className="text-sm font-medium text-foreground"
                    >
                        موضوع پیام
                    </label>

                    <input
                        id="contact-subject"
                        type="text"
                        value={values.subject}
                        onChange={(event) =>
                            handleChange("subject", event.target.value)
                        }
                        placeholder="موضوع پیام خود را وارد کنید"
                        className={inputClass}
                        aria-invalid={Boolean(errors.subject)}
                        aria-describedby={
                            errors.subject ? "contact-subject-error" : undefined
                        }
                    />

                    {errors.subject && (
                        <p
                            id="contact-subject-error"
                            className="text-xs text-danger"
                        >
                            {errors.subject}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="contact-message"
                        className="text-sm font-medium text-foreground"
                    >
                        متن پیام
                    </label>

                    <textarea
                        id="contact-message"
                        rows={6}
                        value={values.message}
                        onChange={(event) =>
                            handleChange("message", event.target.value)
                        }
                        placeholder="پیام خود را بنویسید..."
                        className={`${inputClass} resize-y`}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={
                            errors.message ? "contact-message-error" : undefined
                        }
                    />

                    {errors.message && (
                        <p
                            id="contact-message-error"
                            className="text-xs text-danger"
                        >
                            {errors.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover sm:w-auto"
                >
                    <Send size={17}/>
                    آماده‌سازی و ارسال ایمیل
                </button>

                <p className="text-xs leading-7 text-muted-foreground">
                    با انتخاب این دکمه، نرم‌افزار ایمیل دستگاه شما باز می‌شود.
                    ارسال نهایی پیام از طریق همان نرم‌افزار انجام خواهد شد.
                </p>

            </form>
        </section>
    );
}
