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
            <div>
              <label>Toggle sections:</label>
              {["characters", "numbers", "highestAlphabet"].map((section) => (
                <label key={section}>
                  <input
                    type="checkbox"
                    checked={visibleSections.includes(section)}
                    onChange={() => toggleSection(section)}
                  />
                  {section}
                </label>
              ))}
            </div>

            {visibleSections.includes("characters") && (
              <div>
                <h3>Characters:</h3>
                <p>{response.alphabets.join(", ")}</p>
              </div>
            )}

            {visibleSections.includes("numbers") && (
              <div>
                <h3>Numbers:</h3>
                <p>{response.numbers.join(", ")}</p>
              </div>
            )}

            {visibleSections.includes("highestAlphabet") && (
              <div>
                <h3>Highest Alphabet:</h3>
                <p>{response.highest_alphabet.join(", ")}</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
