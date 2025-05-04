import React, { useEffect, useState } from "react";
import xml2js from "xml2js";

const xmlUrl = "https://dev.compbest.com.ua/xml/compbest_1000_laptop_top_ru_ua.xml";

export default function LaptopStore() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(xmlUrl)
      .then((res) => res.text())
      .then((xmlText) => {
        xml2js.parseString(xmlText, (err, result) => {
          if (err) return console.error("Error parsing XML:", err);
          const items = result.catalog.product || [];
          const parsedItems = items.map((item) => ({
            id: item.id?.[0] || item.code?.[0],
            name: item.name?.[0] || "Без названия",
            description: item.description?.[0] || "Описание отсутствует",
            price: item.price?.[0] || "0",
            image: item.image?.[0] || "https://via.placeholder.com/150",
          }));
          setProducts(parsedItems);
        });
      });
  }, []);

  return (
    <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
      {products.map((product) => (
        <div key={product.id} style={{ border: '1px solid #ddd', borderRadius: '16px', padding: '1rem' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '12px', objectFit: 'cover', height: '200px' }} />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
            <span>{product.price} ₽</span>
            <button>Купить</button>
          </div>
        </div>
      ))}
    </div>
  );
}
