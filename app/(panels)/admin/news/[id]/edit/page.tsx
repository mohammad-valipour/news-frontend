import NewsFormTemplate from "@/features/panels/admin/news/templates/news-form.template";

interface EditNewsPageProps {
    params: Promise<{
        id: number
    }>;
}

export default async function EditNews({params}: EditNewsPageProps) {
    const {id} = await params;

    return <NewsFormTemplate newsID={id}/>;
}
