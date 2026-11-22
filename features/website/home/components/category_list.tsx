import {CategoryType} from "@/types/category.types";
import Link from "next/link";

interface CategoryListProps {
    categories: CategoryType[];
}

export default function CategoryList({categories}: CategoryListProps) {
    return (
        <ul className="space-y-1">
            {
                categories.map(category =>
                    <li key={category.id}>
                        <Link
                            href={`/category/${category.slug}`}
                            className="hover:text-primary transition-colors"
                        >
                            {category.name}
                        </Link>
                    </li>
                )
            }
        </ul>
    );
}