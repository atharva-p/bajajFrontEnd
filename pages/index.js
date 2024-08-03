import { useState } from "react";
import axios from "axios";
import Head from "next/head";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [visibleSections, setVisibleSections] = useState([
    "characters",
    "numbers",
    "highestAlphabet",
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedInput = JSON.parse(input);
      const res = await axios.post(
        "https://bajajbackend.onrender.com/bfhl",
        parsedInput
      );
      setResponse(res.data);
    } catch (error) {
      console.error(error);
      alert(
        "Invalid JSON or API error: " +
          (error.response?.data?.error || error.message)
      );
    }
  };

  const toggleSection = (section) => {
    setVisibleSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div>
      <Head>
        <title>RA2111032020006</title>
        <meta name="description" content="BFHL Frontend" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>RA2111032020006</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Enter JSON here. Example: { "data": ["A","C","z"] }'
          />
          <button type="submit">Submit</button>
        </form>

        {response && (
          <div>
            <h2>Response:</h2>
            <p>Status: {response.is_success ? "Success" : "Failure"}</p>
            <p>User ID: {response.user_id}</p>
            <p>Email: {response.email}</p>
            <p>Roll Number: {response.roll_number}</p>
            <div>
              <h3>Numbers:</h3>
              <p>{response.numbers.join(", ")}</p>
            </div>
            <div>
              <h3>Alphabets:</h3>
              <p>{response.alphabets.join(", ")}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
