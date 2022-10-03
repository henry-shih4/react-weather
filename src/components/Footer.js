export default function Footer() {
  return (
    <>
      <div className="flex justify-between pr-2 pl-2 text-[8px] text-center items-end">
        <div className="flex">
          Github:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/henry-shih4"
            className="pl-1 flex"
          >
            henry-shih4{" "}
            <img
              className="h-[14px] ml-1"
              alt="github"
              src="/images/github-logo.png"
            />
          </a>
        </div>
        <div>Powered by OpenWeatherApp and Geoapify</div>
      </div>
    </>
  );
}
