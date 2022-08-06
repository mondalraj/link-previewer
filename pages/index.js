import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({});
    if (url.length === 0) {
      console.log("url is empty");
      return;
    }
    setLoading(true);
    const response = await fetch("/api/getUrlPreview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });
    const resData = await response.json();
    // console.log(resData);
    setData(resData);
    setLoading(false);
    setUrl("");
  };
  return (
    <div className="py-20 flex flex-col text-center min-h-screen w-full">
      <form>
        <input
          type="text"
          placeholder="Enter URL to be previewed"
          className="input input-bordered w-full max-w-sm"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <br />
        <button
          className="btn btn-outline btn-accent w-36 my-5"
          onClick={handleSubmit}
        >
          Enter
        </button>
      </form>
      <div className="result mt-16 mx-auto">
        {loading ? (
          <div>
            <div>Loading...</div>
            <progress className="progress progress-accent w-56"></progress>
          </div>
        ) : (
          data && (
            <a href={data?.url}>
              <div className="card card-compact w-96 bg-base-100 shadow-xl">
                <figure>
                  <img src={data?.data?.image} alt="Title image" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-left">{data?.data?.title}</h2>
                  <p className="text-left">{data?.data?.description}</p>
                  <a href={data?.url} className="text-left text-sky-500">
                    {data?.url}
                  </a>
                </div>
              </div>
            </a>
          )
        )}
      </div>
    </div>
  );
}
