import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Предполагаемый интерфейс для продукта
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // В реальном приложении здесь будет запрос к API
        // const response = await fetch(`/api/products/${id}`);
        // const data = await response.json();

        // Заглушка для демонстрации
        const mockProduct: Product = {
          id: id || '1',
          name: `Кофе ${id}`,
          description: 'Восхитительный крафтовый кофе с нотками шоколада и карамели.',
          price: 250,
          imageUrl: 'https://via.placeholder.com/400', // URL-заглушка для изображения
        };

        setProduct(mockProduct);
      } catch (err) {
        setError('Не удалось загрузить продукт.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!product) {
    return <div>Продукт не найден.</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '400px', borderRadius: '8px' }} />
      <p>{product.description}</p>
      <h2>Цена: {product.price} руб.</h2>
      {/* Здесь может быть кнопка "Добавить в корзину" */}
    </div>
  );
};

export default ProductPage;
