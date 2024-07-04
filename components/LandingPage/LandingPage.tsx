import { Button } from "@nextui-org/react";

export function LandingPage({
  setDisplayToggle,
}: {
  setDisplayToggle: (value: boolean) => void;
}) {
  return (
    <section className="bg-gray-900/20  text-white h-[80vh] flex items-center content-center justify-center rounded-3xl">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
          Bring Your Imagination
          <span className="sm:block"> to Life </span>
        </h1>

        <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
          Unleash your creativity, design your unique avatar, and capture
          memorable moments.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button
            className="flex items-center content-center  rounded border border-blue-600 bg-blue-600 px-12 py-4 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
            onClick={() => setDisplayToggle(true)}
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}
