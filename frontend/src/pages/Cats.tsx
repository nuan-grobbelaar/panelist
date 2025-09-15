import CatCard from "../components/CatCard/CatCard.tsx";

interface Cat {
    id: number;
    name: string;
    age: number;
    breed: string;
}

interface CatsProps {
    cats: Cat[];
}

const Cats = ({ cats }: Partial<CatsProps>) => {
  return (
    <div>
      <ul>
        {cats?.map((cat) => (
          <CatCard key={cat.id} cat={cat} />
        ))}
      </ul>
    </div>
  );
};

export default Cats;
