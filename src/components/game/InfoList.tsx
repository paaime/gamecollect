type IdName = {
  id: number;
  name: string;
};

export default function InfoList({
  title,
  list,
}: {
  title: string;
  list: IdName[];
}) {
  return (
    <div>
      <p className="text-md font-medium text-white">{title}</p>
      <div className="flex flex-wrap gap-3 py-5">
        {list.map((theme, key) => (
          <p
            className="rounded-lg bg-navy-700 px-4 py-2 text-sm font-medium text-gray-600"
            key={key}
          >
            {theme.name}
          </p>
        ))}
      </div>
    </div>
  );
}
