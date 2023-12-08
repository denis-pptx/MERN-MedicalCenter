import React from 'react';
import CategoryItem from '../Items/CategoryItem';

const CategoryList = ({ categories, onEdit, onDelete }) => {
    return (
        <div>
            {categories.map(category => (
                <CategoryItem
                    key={category._id}
                    category={category}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default CategoryList;
