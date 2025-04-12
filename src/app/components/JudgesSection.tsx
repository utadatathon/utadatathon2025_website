
export default function JudgesSection() {

  const judges = [
  {
    name: "Rubab Shahzad",
    title: "Data Visualization Librarian",
    image: "/images/judges/rubab.jpg"
  },
  {
    name: "Jay Shah",
    title: "",
    image: "/images/judges/jay.jpg"
  },
  {
    name: "Clivin Geju",
    title: "",
    image: "/images/judges/clivin.jpg"
  },
  {
    name: "John Connolly",
    title: "",
    image: "/images/judges/john.jpeg"
  },
  {
    name: "Sai Nikhitha",
    title: "",
    image: "/images/team/nikitha.jpg"
  },
  {
    name: "Zecil Jain",
    title: "",
    image: "/images/judges/zecil.jpg"
  },
  {
    name: "Abhijit Challapalli",
    title: "",
    image: "/images/judges/abhi.jpeg"
  },
  {
    name: "Samarth Jagtap",
    title: "",
    image: "/images/team/samarth.jpg"
  },
  {
    name: "Dr. Franklin Rivas",
    title: "",
    image: "/images/speakers/franklin.jpeg"
  },
  {
    name: "Dr. Mei Yang",
    title: "",
    image: "/images/judges/mei.jpeg"
  },
  {
    name: "Dr. Behzad Ghanbarian",
    title: "Associate Professor",
    image: "/images/judges/behzad.jpeg"
  },
]

  return (
    <div className="judges-section">
      <div className="judges">
        {judges.map((speaker, index) => (
            <div key={index} className="judge">
            <img src={speaker.image} alt={speaker.name} width={200} height={200} />
            <h4>{speaker.name}</h4>
            </div>
        ))}
      </div>
    </div>
  );
}
