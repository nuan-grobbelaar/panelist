import React from "react";
import styles from "./CatCard.module.scss";

interface Cat {
    id: number;
    name: string;
    age: number;
    breed: string;
}

interface CatCardProps {
    cat: Cat;
}

const CatCard: React.FC<CatCardProps> = ({ cat }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.name}>{cat.name}</h2>
      <p className={styles.detail}>
        <strong>Age:</strong> {cat.age}
      </p>
      <p className={styles.detail}>
        <strong>Breed:</strong> {cat.breed}
      </p>
    </div>
  );
};

export default CatCard;