import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zhZFnwyOYLgqlLWk/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex items-center">
        <div className="backdrop-blur-sm bg-white/50 rounded-2xl p-6 sm:p-8 shadow-xl border border-white/60">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            Plan, Promote, and Run Beautiful Events
          </h1>
          <p className="mt-3 text-gray-700 max-w-2xl">
            A modern, minimalist hub for participants and committees — with live popularity insights and smooth interactions.
          </p>
        </div>
      </div>
    </section>
  );
}
