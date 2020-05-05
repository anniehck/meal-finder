import { useEffect, useState } from 'react';
import { Category } from '../../types/Category';
import { Service } from '../../types/Service';
import { Status } from '../../types/Status';

export interface CategoryList {
    categories: Category[];
}

const useCategoryService = () => {
    const [categories, setCategories] = useState<Service<CategoryList>>({
        status: Status.Loading
    });

    const formatCategory = (category: any): Category => {
        return {
            id: category.idCategory,
            name: category.strCategory,
            description: category.strCategoryDescription,
            thumbnailUrl: category.strCategoryThumb
        };
    };

    useEffect(() => {
        setCategories({ status: Status.Loading });
        fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
            .then(res => res.json())
            .then(res => {
                const formatted = {
                    categories: res.categories
                        ? res.categories.map((category: any) => formatCategory(category))
                        : null
                };

                setCategories({ status: Status.Loaded, payload: formatted });
            })
            .catch(err => setCategories({ status: Status.Error, error: err }));
    }, []);

    return categories;
}

export default useCategoryService;