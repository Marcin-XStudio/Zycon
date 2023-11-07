
export default function Home() {

	const data = {
		sitename: "A venir",
		sitetagline: "Patienez encore un peu...",
		sitelogo: "",
		title: "Bientôt en ligne!",
		description: "Nous travaillons 👨‍💻 fort pour vous livrer quelque chose d'exceptionnel, nous avous hâte de partager notre travail avec vous 📅. Ca arrive très bientôt! 🚀 Vous allez adorer! 😍.",
		copyrightText: "Copyright © 2023 | Design and Developed By &nbsp;<a target=\"_blank\" class=\"no-underline md:underline\" href=\"https://www.x-studio.fr/\">X-Studio</a>",
	};
	const {
		sitename,
		sitetagline,
		description,
		copyrightText,
		title,
	} = data;

	return (
		<>
			<main className="flex min-h-screen bg-slate-950 flex-col items-center justify-between p-5 lg:p-12">
				<div className="z-10 w-full max-w-5xl items-center justify-between text-sm ">

					<div className=" bottom-0 left-0 flex h-30 md:h-48 w-full items-end justify-center  lg:static lg:h-auto lg:w-auto lg:bg-none">
						<a
							className="pointer-events-none flex place-items-center gap-2 p-4 lg:pointer-events-auto lg:p-0"
							href="/"
							rel="noopener noreferrer"
						>
							<div className='flex flex-col text-center'>
								<h1 className='text-2xl lgtext-4xl text-sky-400/100 font-semibold	'> {sitename} </h1>
								<p className='text-2 font-medium m-2  text-slate-100'>{sitetagline}</p>
							</div>
						</a>
					</div>
				</div>

				<div className="relative flex flex-col  place-items-center ">
					<h2 className='text-center font-heading m-10 text-6xl sm:text-7xl lg:text-8xl leading-[5rem] sm:leading-[7rem] lg:leading-[7rem] font-bold '>
						<span className='bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500'>{title}</span>
						<span className=''>⏳</span>
					</h2>
					<p className='text-2xl md:text-3xl px-6 max-w-3xl text-center m-5 text-slate-100 font-thin' dangerouslySetInnerHTML={{
						__html: description
					}}>
					</p>
				</div>
				<footer className='text-slate-500 text-center'>
					<div className='my-4 text-center' >
					</div>
					<div className=''>
						<p className='' dangerouslySetInnerHTML={{
							__html: copyrightText
						}}>
						</p>

					</div>
				</footer>

			</main>
		</>
	);
}