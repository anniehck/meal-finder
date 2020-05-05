import { useEffect, useState } from 'react';
import { Meal } from '../../types/Meal';
import { Service } from '../../types/Service';
import { Status } from '../../types/Status';

export interface MealById {
    meal: Meal;
}

interface Ingredient {
    name: string;
    measurement: string;
}

const useMealByIdService = (mealId: string) => {
    const [meal, setMeal] = useState<Service<MealById>>({
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

    useEffect(() => {
        const emptyMeal = { id: '', name: '', drinkPairing: '', area: '', category: '', instructions: '', tags: '', thumbnailUrl: '', ingredients: [] };
        const formatRes = (res: any) => {
            const formatted = {
                meal: res.meals
                    ? formatMeal(res.meals[0])
                    : emptyMeal
            };

            setMeal({ status: Status.Loaded, payload: formatted });
        };

        if (mealId) {
            setMeal({ status: Status.Loading });
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
                .then(res => res.json())
                .then(formatRes)
                .catch(err => setMeal({ status: Status.Error, error: err }));
        }
    }, [mealId]);

    return meal;
}

export default useMealByIdService;