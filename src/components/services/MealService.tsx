import { useEffect, useState } from 'react';
import { Meal } from '../../types/Meal';
import { Service } from '../../types/Service';
import { Status } from '../../types/Status';
import { Filter } from '../../types/Filter';

export interface MealsList {
    meals: Meal[];
}

interface Ingredient {
    name: string;
    measurement: string;
}

const useMealService = (name: string, filterBy: Filter) => {
    const [meals, setMeals] = useState<Service<MealsList>>({
        status: Status.Loading
    });

    const formatMeal = (meal: any): Meal => {
        const ingredients: Ingredient[] = [];

        Object.entries(meal).forEach(([key, val]: [string, any]) => {
            if (key.includes('strIngredient') && val) {
                const index = key.match(/\d+$/)![0],
                    measurement = meal[`strMeasure${index}`],
                    ingredient: Ingredient = { name: val, measurement };
                ingredients.push(ingredient);
            }
        });

        return {
            id: meal.idMeal,
            name: meal.strMeal,
            drinkPairing: meal.strDrinkAlternate,
            area: meal.strArea,
            instructions: meal.strInstructions,
            category: meal.strCategory,
            thumbnailUrl: meal.strMealThumb,
            tags: meal.strTags,
            ingredients
        };
    };

    const getUrl = (filterBy: Filter, name?: string) => {
        switch (filterBy) {
            case Filter.Category:
                return `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`;
            case Filter.Ingredient:
                return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`;
            case Filter.Meal:
                return `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
            case Filter.Random:
                return `https://www.themealdb.com/api/json/v1/1/random.php`;
            default:
                return '';
        }
    }

    useEffect(() => {
        const formatRes = (res: any) => {
            const formatted = {
                meals: res.meals
                    ? res.meals.map((meal: any) => formatMeal(meal))
                    : null
            };

            setMeals({ status: Status.Loaded, payload: formatted });
        };

        if (filterBy) {
            const url: string = getUrl(filterBy, name);
            setMeals({ status: Status.Loading });
            fetch(url)
                .then(res => res.json())
                .then(formatRes)
                .catch(err => setMeals({ status: Status.Error, error: err }));
        }
    }, [name, filterBy]);

    return meals;
}

export default useMealService;