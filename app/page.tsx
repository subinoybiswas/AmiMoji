"use client";
import VideoView from "@/components/VideoView/VideoView";

export default function Home() {
  const displayToggle = true;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[url('/bg.svg')] bg-cover ">
      {/* {Background taken from https://www.svgbackgrounds.com/set/free-svg-backgrounds-and-patterns/} */}
      <div className="fixed h-full w-full backdrop-blur-lg">
        {/* <section className="bg-gray-900 text-white">
    <div className="mx-auto max-w-3xl text-center">
    <h1
    className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
    >
    Understand User Flow.
    
    <span className="sm:block"> Increase Conversion. </span>
    </h1>
    
    <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus
    numquam ea!
    </p>
    
    <div className="mt-8 flex flex-wrap justify-center gap-4">
    <a
    className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
    href="#"
    >
    Get Started
    </a>
    
    <a
    className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
    href="#"
    >
    Learn More
    </a>
    </div>
        </div>
        </section> */}

        <div className="flex flex-col items-center justify-between  min-h-screen">
          <div className="fixed bg-slate-600/30 w-3/4 backdrop-blur-lg h-3/4 rounded-xl p-5">
            <VideoView displayToggle={displayToggle} />
          </div>
        </div>
      </div>
    </main>
  );
}
