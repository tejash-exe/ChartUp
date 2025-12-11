import { useRef } from "react";
import { Link } from "react-router";
// Hooks
import useAnimate from "../hooks/useAnimate";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
// Components
import GraphCarousel from "../components/welcome/GraphCarousel";
import BarGraph from "../components/graphModule/graphs/BarGraph";
import ThemeSelector from "../components/navbar/ThemeSelector";
import DirectButton from "../components/welcome/DirectButton";
import WelcomeLoginButton from "../components/welcome/WelcomeLoginButton";

const Welcome = () => {

  const graph = useAnimate();
  const ref = useRef();

  document.title = "ChartUp";

  return (
    <div className="min-h-screen h-screen w-full relative bg-linear-to-br from-white via-blue-100 to-blue-200 dark:from-blue-950 dark:via-gray-950 dark:to-black">

      {/* Soft animated blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-24 w-96 h-96 rounded-full bg-blue-300/30 dark:bg-blue-950/60 blur-3xl" />
        <div className="absolute -right-24 top-10 w-72 h-72 rounded-full bg-pink-300/20 dark:bg-pink-950/15 blur-2xl" />
        <div className="absolute left-1/2 top-[65%] translate-x-[-50%] w-xl h-72 rounded-full bg-white/30 dark:bg-gray-800/30 blur-2xl" />
      </div>

      {/* Scroll container with snap */}
      <main className="relative z-10 h-full w-full overflow-y-auto scroll-smooth snap-y snap-mandatory">
        <div className='absolute top-8 right-8'>
          <ThemeSelector />
        </div>

        {/* 1. HERO */}
        <section className="min-h-screen snap-start flex items-center justify-center p-6">
          <div id="hero" className="relative max-w-5xl w-full flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 heroContainer">
              <div className="bg-white/30 dark:bg-blue-950/30 rounded-3xl border border-white dark:border-gray-400/40 backdrop-blur-xs p-8 shadow-md">

                <h1 className="font-bold md:text-5xl text-4xl bg-radial from-blue-400 from-10% to-blue-600 bg-clip-text text-transparent tracking-tight leading-tight">ChartUp</h1>
                <p className="mt-3 text-base md:text-lg opacity-90 dark:text-white">Make data beautiful and interactive — create, edit and visualize graphs in a lightweight app with a soft glass UI.</p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <DirectButton message={"🚀 Use directly"} />
                  <WelcomeLoginButton message={"Login"} />
                </div>

                <div className="mt-6 text-xs text-slate-700 dark:text-slate-300">
                  No account required to explore — but login enables saving & sync.
                </div>

              </div>
            </div>

            <div className="w-full lg:w-1/2 heroContainer">
              <div className="relative">
                <div className="bg-white/30 dark:bg-blue-950/30 rounded-3xl border border-white dark:border-gray-400/40 backdrop-blur-xs p-6 shadow-lg">

                  <div className="text-sm font-medium mb-2 text-slate-700 dark:text-slate-200">Live preview</div>

                  <div className="h-48 md:h-56 rounded-xl flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full">
                      <div className='p-2 w-full h-full'>
                        <BarGraph graph={graph} ref={ref} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                    <div>Interactive • responsive • exportable</div>
                    <div>Glass UI</div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ABOUT */}
        <section className="min-h-screen snap-center flex items-center justify-center p-6">
          <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/30 dark:bg-blue-950/30 p-6 rounded-3xl border border-white dark:border-gray-400/40 backdrop-blur-xs shadow-md">

              <h3 className="text-xl font-semibold dark:text-white">What is ChartUp?</h3>

              <p className="mt-3 text-sm opacity-90 dark:text-slate-200">
                ChartUp is a minimal, fast graph editor built for quick iteration. Add labels, change values,
                switch graph types, and export charts effortlessly. The interface is optimized for desktop and mobile,
                with a glass-inspired visual language.
              </p>

              <ul className="mt-4 space-y-2 text-sm dark:text-slate-200">
                <li>⚡ Real-time editing with auto-save</li>
                <li>📊 Multiple graphs per account</li>
                <li>🧊 Export charts as PNG with glass background</li>
              </ul>

            </div>

            <div className="bg-white/30 dark:bg-blue-950/30 p-6 rounded-3xl border border-white dark:border-gray-400/40 backdrop-blur-xs shadow-md">

              <h3 className="text-xl font-semibold dark:text-white">Why you'll like it <FontAwesomeIcon className='text-red-500' icon={faHeart} /></h3>

              <p className="mt-3 text-sm opacity-90 dark:text-slate-200">Built for designers and data-curious people who want beautiful defaults without the fuss. Focus on the story your data tells — not the tooling.</p>

              <div className="mt-4 flex gap-3">

                <Link to="https://www.linkedin.com/in/aditya-choudhary-31137b291/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-linear-to-r from-blue-400 to-blue-500 text-white text-sm hover:scale-[1.02] duration-200">
                  <FontAwesomeIcon className='text-base' icon={faLinkedin} />
                  LinkedIn
                </Link>

                <Link to="https://github.com/tejash-exe" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-white hover:bg-transparent duration-200 text-sm dark:hover:bg-slate-300 dark:hover:border-slate-300">
                  <FontAwesomeIcon className='text-base' icon={faGithub} />
                  GitHub
                </Link>

              </div>
            </div>
          </div>
        </section>

        {/* 3. FEATURES / HOW IT WORKS */}
        <section className="min-h-screen snap-end flex items-center justify-center p-6">
          <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* CREATE */}
            <div className="col-span-1 bg-white/30 dark:bg-blue-950/30 p-5 rounded-3xl border border-white dark:border-gray-400/40 backdrop-blur-xs flex flex-col items-center justify-between shadow-md">

              {/* --- VISUAL #1: Responsive Bar Graph Preview --- */}
              <div className="w-full flex items-center justify-center mb-4">
                {/* Replace this with your real BarGraph component */}
                <GraphCarousel graph={graph} />
              </div>

              <div>
                <h4 className="font-semibold mb-2 w-full text-center dark:text-white">Create</h4>
                <p className="text-sm opacity-90 text-center dark:text-slate-200">
                  Add labels, values and instantly see previews.
                </p>
              </div>
            </div>

            {/* VIEW */}
            <div className="col-span-1 bg-white/30 dark:bg-blue-950/30 p-5 rounded-3xl border border-white backdrop-blur-xs flex flex-col items-center justify-between shadow-md dark:border-gray-400/40 ">

              {/* --- VISUAL #2: Auto-cycling graph with toggle buttons --- */}
              <div className="w-full flex flex-col items-center justify-center gap-2 mb-4">
                <GraphCarousel graph={graph} defaultGraphType={"Line"} isType={true} />
              </div>

              <div>
                <h4 className="font-semibold mb-2 w-full text-center dark:text-white">View</h4>
                <p className="text-sm opacity-90 text-center dark:text-slate-200">
                  View different graphs for same data effortlessly.
                </p>
              </div>
            </div>

            {/* EXPORT */}
            <div className="col-span-1 bg-white/30 dark:bg-blue-950/30 p-5 rounded-3xl border border-white backdrop-blur-xs flex flex-col items-center justify-between shadow-md dark:border-gray-400/40">

              {/* --- VISUAL #3: Graph with download button --- */}
              <div className="w-full flex flex-col items-center justify-center mb-4 gap-2">
                <GraphCarousel graph={graph} defaultGraphType={"Pie"} isType={true} isDownload={true} />
              </div>

              <div>
                <h4 className="font-semibold mb-2 w-full text-center dark:text-white">Export</h4>
                <p className="text-sm opacity-90 text-center dark:text-slate-200">
                  Export PNG with the same values and design.
                </p>
              </div>
            </div>

          </div>
        </section>


        {/* 4. FOOTER / CTA */}
        <section className="min-h-[60vh] snap-start flex items-end justify-center px-6 pb-12">
          <div className="max-w-3xl w-full text-center">
            <div className="bg-white/30 dark:bg-blue-950/30 rounded-3xl border border-white backdrop-blur-xs p-6 shadow-md dark:border-gray-400/40">

              <h3 className="text-xl font-semibold dark:text-white">Ready to build something beautiful?</h3>

              <p className="mt-2 text-sm opacity-90 dark:text-slate-200">Try it now or sign in to sync across devices.</p>

              <div className="mt-4 flex justify-center gap-3">
                <DirectButton message={"Try it now"}/>
                <WelcomeLoginButton message={"Sign in"} />
              </div>

              <div className="mt-4 text-xs opacity-80 dark:text-slate-200">
                © {new Date().getFullYear()} ChartUp — <Link to="https://github.com/tejash-exe/ChartUp" className="underline" target='_blank'>Source</Link>
              </div>

            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Welcome;