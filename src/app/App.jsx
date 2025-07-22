import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';

// import components
import DownloadButton from '../common/components/DownloadButton/DownloadButton';
import IconButton from '../common/components/IconButton/IconButton';
import InputField from '../common/components/InputField/InputField';
import TextAreaField from '../common/components/TextAreaField/TextAreaField';
import SubmitButton from '../common/components/SubmitButton/SubmitButton';
import Loader from '../common/components/Loader/Loader';
import cv from '../assets/files/cv.pdf';

// import icons
import { FaReact } from "react-icons/fa";
import { AiFillGithub, AiFillLinkedin, AiFillHtml5, AiOutlineEye } from "react-icons/ai";
import { BiLogoGmail, BiLogoCss3, BiLogoJavascript, BiLogoRedux, BiLogoJava } from "react-icons/bi";
import { BsFacebook, BsGit, BsPuzzle } from "react-icons/bs";
import { TbBrandCpp } from "react-icons/tb";
import { FaMobileAlt } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { SiTypescript, SiRecoil, SiReactquery } from "react-icons/si";

//import images
import Asrc from '../assets/images/asrc.webp';
import Agentelite from '../assets/images/agentelite.webp';
import Maidenvoyage from '../assets/images/maidenvoyage.svg';
import Learn from '../assets/images/learn.svg';
import Usu from '../assets/images/usu.png';

// import style
import style from './App.module.css';
import clsx from 'clsx';

const skills = [
	{
		name: '.Net Logo',
		url: "https://camo.githubusercontent.com/f4c52b575a890c7e67c6541271fc5733506088d19c77ffde6bab3e18e7948536/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2e4e45542d3543324439313f7374796c653d666f722d7468652d6261646765266c6f676f3d2e6e6574266c6f676f436f6c6f723d7768697465",
	},
	{
		name: 'C# Logo',
		url: "https://camo.githubusercontent.com/e12029f1d6292800c6a63b7c134a199d76f99552944e2000beef21abca451162/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f632532332d2532333233393132302e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d637368617270266c6f676f436f6c6f723d7768697465"
	}, 
	{
		name: "Laravel Logo",
		url: "https://camo.githubusercontent.com/839c2b7156d9a4e8f021ae6c539331e84ea18bf0fd0ee15835f0695a838b292e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c61726176656c2d4646324432303f7374796c653d666f722d7468652d6261646765266c6f676f3d6c61726176656c266c6f676f436f6c6f723d7768697465"
	},
	{
		name: "PHP Logo",
		url: "https://camo.githubusercontent.com/59f1bf1e0c03f98c620e6456751406b0c8dba1ac0590704d93303b45cfe536ab/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5048502d3737374242343f7374796c653d666f722d7468652d6261646765266c6f676f3d706870266c6f676f436f6c6f723d7768697465"
	},
	{
		name: "Vue.js Logo",
		url: "https://camo.githubusercontent.com/7ee502068c9b87eb84df40ef974addabb7ad25ff9d53c19ee793555ecd7ea509/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5675652e6a732d3335343935453f7374796c653d666f722d7468652d6261646765266c6f676f3d767565646f746a73266c6f676f436f6c6f723d344643303844"
	},
	{
		name: "SQL Logo",
		url: "https://camo.githubusercontent.com/4804cde16e9487428ea27793df49b0ada0166115301325bade5532ae7060ed04/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4d7953514c2d3030354338343f7374796c653d666f722d7468652d6261646765266c6f676f3d6d7973716c266c6f676f436f6c6f723d7768697465"
	},
	{
		name: "Tailwind.css Logo",
		url: "https://camo.githubusercontent.com/95759dac505a57f5a260db91eca6f7a0c852a095cb271cc6d37c413081c5f799/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5461696c77696e645f4353532d3338423241433f7374796c653d666f722d7468652d6261646765266c6f676f3d7461696c77696e642d637373266c6f676f436f6c6f723d7768697465"
	}
];

const projects = [
	{
		name: '.Net/Fullstack Developer @ ASRC Federal',
		location: "Remote",
		alt: "ASRC Federal Logo",
		image: Asrc,
		dates: "July 2024 - Present",
		tasks: [
			"Maintained and developed RESTful API endpoints within a .NET framework",
			"Validated API functionality through unit testing as the use of Swagger",
			"Followed industry-standard deprecation practices for legacy endpoints",
			"Collaborated closely with QA to identify, track, and resolve defects",
			"Adapted to evolving requirements while working in an Agile environment"
		  ],
		  badges: [
			"https://camo.githubusercontent.com/f4c52b575a890c7e67c6541271fc5733506088d19c77ffde6bab3e18e7948536/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2e4e45542d3543324439313f7374796c653d666f722d7468652d6261646765266c6f676f3d2e6e6574266c6f676f436f6c6f723d7768697465",
			"https://camo.githubusercontent.com/e12029f1d6292800c6a63b7c134a199d76f99552944e2000beef21abca451162/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f632532332d2532333233393132302e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d637368617270266c6f676f436f6c6f723d7768697465",
			"https://camo.githubusercontent.com/4804cde16e9487428ea27793df49b0ada0166115301325bade5532ae7060ed04/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4d7953514c2d3030354338343f7374796c653d666f722d7468652d6261646765266c6f676f3d6d7973716c266c6f676f436f6c6f723d7768697465",
			"https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white",
			"https://img.shields.io/badge/SonarQube-black?style=for-the-badge&logo=sonarqube&logoColor=4E9BCD"
		  ]
	},
	{
		name: 'Software Developer @ Maiden Voyage Software',
		location: "Logan, Utah",
		alt: "Maiden Voyage Logo",
		image: Maidenvoyage,
		dates: "November 2021 - July 2024",
		tasks: [
			"Developed and maintained web applications using Laravel and Vue.js, both from scratch and within existing codebases",
			"Contributed to Ionic-based mobile app projects, supporting cross-platform functionality",
			"Led onboarding and training for new team members to ensure smooth integration and knowledge transfer",
			"Conducted thorough code reviews to uphold code quality, consistency, and best practices",
			"Collaborated directly with clients to gather requirements and define project goals"
		  ],
		  badges: [
			"https://camo.githubusercontent.com/839c2b7156d9a4e8f021ae6c539331e84ea18bf0fd0ee15835f0695a838b292e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c61726176656c2d4646324432303f7374796c653d666f722d7468652d6261646765266c6f676f3d6c61726176656c266c6f676f436f6c6f723d7768697465",
			"https://camo.githubusercontent.com/59f1bf1e0c03f98c620e6456751406b0c8dba1ac0590704d93303b45cfe536ab/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5048502d3737374242343f7374796c653d666f722d7468652d6261646765266c6f676f3d706870266c6f676f436f6c6f723d7768697465",
			"https://camo.githubusercontent.com/7ee502068c9b87eb84df40ef974addabb7ad25ff9d53c19ee793555ecd7ea509/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5675652e6a732d3335343935453f7374796c653d666f722d7468652d6261646765266c6f676f3d767565646f746a73266c6f676f436f6c6f723d344643303844",
			"https://camo.githubusercontent.com/4804cde16e9487428ea27793df49b0ada0166115301325bade5532ae7060ed04/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4d7953514c2d3030354338343f7374796c653d666f722d7468652d6261646765266c6f676f3d6d7973716c266c6f676f436f6c6f723d7768697465",
			"https://camo.githubusercontent.com/95759dac505a57f5a260db91eca6f7a0c852a095cb271cc6d37c413081c5f799/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5461696c77696e645f4353532d3338423241433f7374796c653d666f722d7468652d6261646765266c6f676f3d7461696c77696e642d637373266c6f676f436f6c6f723d7768697465",
			"https://img.shields.io/badge/Ionic-%233880FF.svg?style=for-the-badge&logo=Ionic&logoColor=white"
		  ]
	},
	{
		name: 'Web Developer @ Agent Elite',
		location: "San Diego, California",
		alt: "Agent Elite Logo",
		image: Agentelite,
		dates: "December 2019 - August 2021", 
		tasks: [
			"Developed and customized WordPress themes, plugins, shortcodes, and metaboxes to meet business requirements",
			"Maintained and updated client websites with CSS and jQuery enhancements",
			"Implemented a custom PTO request workflow within the company time clock system using WordPress and PHP",
			"Supported the launch and configuration of new servers to ensure successful deployments",
			"Collaborated with internal teams to deliver reliable and scalable WordPress solutions"
		  ],
		  badges: [
			"https://camo.githubusercontent.com/839c2b7156d9a4e8f021ae6c539331e84ea18bf0fd0ee15835f0695a838b292e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c61726176656c2d4646324432303f7374796c653d666f722d7468652d6261646765266c6f676f3d6c61726176656c266c6f676f436f6c6f723d7768697465",
			"https://camo.githubusercontent.com/59f1bf1e0c03f98c620e6456751406b0c8dba1ac0590704d93303b45cfe536ab/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5048502d3737374242343f7374796c653d666f722d7468652d6261646765266c6f676f3d706870266c6f676f436f6c6f723d7768697465",
			"https://camo.githubusercontent.com/4804cde16e9487428ea27793df49b0ada0166115301325bade5532ae7060ed04/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4d7953514c2d3030354338343f7374796c653d666f722d7468652d6261646765266c6f676f3d6d7973716c266c6f676f436f6c6f723d7768697465",
			"https://img.shields.io/badge/WordPress-%23117AC9.svg?style=for-the-badge&logo=WordPress&logoColor=white",
			"https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white",
			"https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white"
		  ]
	}
]

const education = [
	{
		name: 'Utah State University',
		location: "Logan, Utah",
		alt: "USU Logo",
		image: Usu,
		dates: "August 2021 - May 2024", 
		degree: "Computer Science BS",
		badges: [
			"https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54",
			"https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white",
			"https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white",
			"https://img.shields.io/badge/kotlin-%237F52FF.svg?style=for-the-badge&logo=kotlin&logoColor=white",
			"https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E",
			"https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D",
		  ]
	},
	{
		name: 'Learn Academy',
		location: "San Diego, California",
		alt: "Learn Logo",
		image: Learn,
		dates: "June 2019 - September 2019", 
		degree: "Fullstack Development Certificate",
		badges: [
			"https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white",
			"https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white",
			"https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E",
			"https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB",
			"https://img.shields.io/badge/ruby-%23CC342D.svg?style=for-the-badge&logo=ruby&logoColor=white",
			"https://img.shields.io/badge/rails-%23CC0000.svg?style=for-the-badge&logo=ruby-on-rails&logoColor=white"
		  ]
	},
];

function App() {
	const form = useRef();

	const [menu, setMenu] = useState(false);
	const [loading, setLoading] = useState(false);
	const [verified, setVerified] = useState(false);
	const [statusMessage, setStatusMessage] = useState(null);
	const [statusType, setStatusType] = useState(null);

	const sendEmail = (e) => {
		e.preventDefault();
		if (!verified) {
			setStatusMessage("Please complete the reCAPTCHA");
			setStatusType("error");
			return;
		  }
		setLoading(true);
		setStatusMessage(null);

		setTimeout(function () {
			emailjs.sendForm('service_1ldxfad', 'template_lruwb8e', form.current, 'xABSEVtJoBAzm7FhX')
				.then((result) => {
					e.target.name.value = '';
					e.target.email.value = '';
					e.target.message.value = '';

					setStatusMessage("Message sent successfully!");
					setStatusType("success");
				})
				.catch(() => {
					setStatusMessage("Failed to send message. Please try again.");
					setStatusType("error");
				})
				.finally(() => {
					setLoading(false);
				});
		}, 2000);

	};

	return (
		<div className={style.app}>
			{/* Navbar */}
			<div className={style.nav}>
				<a className={style.logo}>
					<h5>Paige MacGregor</h5>
				</a>
				<ul>
					<li><a href="#Home">Home</a></li>
					<li><a href="#About">About</a></li>
					<li><a href="#Projects">Projects</a></li>
					<li><a href="#Contact">Contact</a></li>
				</ul>
				<div className={style["menu-icon"]}>
					<input id='checkbox' className={style["checkbox2"]} type="checkbox" />
					<label className={`${style.toggle} ${style.toggle2}`} for="checkbox" onClick={() => setMenu(!menu)}>
						<div className={`${style.bars} ${style.bar4}`}></div>
						<div className={`${style.bars} ${style.bar5}`}></div>
						<div className={`${style.bars} ${style.bar6}`}></div>
					</label>
				</div>
			</div>
			{
				menu === true &&
				<ul className={style.menu}>
					<li><a href="#Home">Home</a></li>
					<li><a href="#About">About</a></li>
					<li><a href="#Experience">Experience</a></li>
					<li><a href="#Education">Education</a></li>
					<li><a href="#Contact">Contact</a></li>
				</ul>
			}

			{/* Home */}
			<div id='Home' className={style.home}>
				<div className={style["home-content"]}>
					<h1>Hey, I'm <span className={style["home-italic"]}>Paige MacGregor</span></h1>
					<p>A Full Stack Developer, skilled at building and maintaining frontends, backends, and databases for websites and applications that lead to the success of the overall product</p>
					<a
						href={cv}
						download="cv-PDF-document"
						target="_blank"
						rel="noopener noreferrer"
					>
						<DownloadButton >
							Download Resume
						</DownloadButton>
					</a>
				</div>
				<div className={style["scroll-icon"]}>
					<div className={style["scroll-down"]} style={{ color: "skyblue !important" }}>
						<div className={style.chevrons}>
							<div className={style["chevron-down"]}></div>
							<div className={style["chevron-down"]}></div>
						</div>
					</div>
				</div>
				<div className={style["contact-nav"]}>
					<a className={style.github} target="_blank" href='https://github.com/paigem33' >
						<AiFillGithub size="30px" color='black' />
					</a>
					<a className={style.linkedin} target="_blank" href='https://www.linkedin.com/in/paige-macgregor/' >
						<AiFillLinkedin size="30px" color='black' />
					</a>
				</div>
			</div>

			{/* About */}
			<div id='About' className={style.about}>
				<div className={style.container}>
					<div className={style["about-content"]}>
						<div className={style["about-info"]}>
							<h3 className={style.title}>About Me</h3>
							<p>
								I have been working and studying in the tech world for about 7 years, and I have loved every second of it, both the satisfying and the frustrating ones! I enjoy having the opportunity to learn new skills and solve new problems everyday, one line of code at a time. <br /> <br />
								In 2019, I graduated from a coding bootcamp in San Diego, California and got my first full time job as a developer shortly thereafter. I was there for about two years, and during that time I realized this was what I loved and wanted to do forever. That led me to enroll at Utah State University and graduate with a Computer Science degree in 2024. During that time I had the opportunity to start working at another amazing company, which meant I was able to grow my skill set both in and out of the classroom. Upon graduation, my education and previous experience allowed me to start working in my current role at ASRC Federal.<br /> <br />
								When I'm not behind a computer, you can normally find me either with my nose in a book, out on a hike, rewatching Star Trek TNG for the tenth time, or setting up camp for a weekend in the mountains.
							</p>
							<div className={style["my-skill"]}>
								<h3>Some of my favorites:</h3>
								<div className={style.skills}>
									{
										skills.map((skill, index) => {
											return <div key={`skill${index}`} className={style.skill}>
												<img src={skill.url} alt={skill.name}/>
											</div>
										})
									}
								</div>
							</div>
						</div>
						<div className={style["about-image"]}></div>
					</div>
				</div>
			</div>

			{/* Experience */}
			<div id='Experience' className={style.projects}>
				<div className={style.container}>
					<h2 className={style.title}>Experience</h2>
					<div className={style["projects-list"]}>
						{
							projects.map((project, index) => {
								return <div key={`project-${index}`} className={style.project}>
									<div className={style["project-image"]}>
										<img src={project.image} alt={project.alt}/>
									</div>
									<div className={style["project-info"]}>
										<h3>{project.name}</h3>
										<p>{project.dates}</p>
										<p>{project.location}</p>
										<ul className={style["project-tasks"]} >
										{
											project.tasks.map((task, index) => {
												return <li key={`task-${index}`}>{task}</li>
												
											})
										}
										</ul>
										<div className={style["project-badges"]}>
										{
											project.badges.map((badge, index) => {
												return <img src={badge} alt="Software badge" key={index}/>
											})
										}
										</div>
									</div>
								</div>
							})
						}

					</div>
				</div>
			</div>

			{/* Education */}
			<div id='Education' className={style.education}>
				<div className={style.container}>
					<h2 className={style.title}>Education</h2>
					<div className={style["education-list"]}>
						{
							education.map((education, index) => {
								return <div key={`education-${index}`} className={style["education-item"]}>
									<div className={style["education-image"]}>
										<img src={education.image} alt={education.alt}/>
									</div>
									<div className={style["education-info"]}>
										<h3>{education.degree}, {education.name}</h3>
										<p>{education.dates}</p>
										<p>{education.location}</p>
										<div className={style["education-badges"]}>
										{
											education.badges.map((badge, index) => {
												return <img src={badge} alt="Software badge" key={index}/>
											})
										}
										</div>
									</div>
								</div>
							})
						}

					</div>
				</div>
			</div>

			{/* do to: style education, make everything mobile friendly, add my resume, test email form, maybe add internships */}

			{/* Contact */}
			<div id='Contact' className={style.contact}>
				<div className={style.container}>
					<h2 className={style.title}>Contact</h2>
					<p>Feel free to Contact me by submitting the form below and I will get back to you as soon as possible</p>
					<form
						ref={form} onSubmit={sendEmail}
						className={
							clsx(
								{ [style['inactive-form']]: loading }
							)}
					>
						<InputField
							width="700px"
							height="40px"
							name="name"
							placeholder="Enter Your Name"
							label="Name"
							type="text"
						/>
						<InputField
							width="700px"
							height="40px"
							name="email"
							placeholder="Enter Your Email"
							label="Email"
							type="email"
						/>
						<TextAreaField
							width="700px"
							height="250px"
							name="message"
							placeholder="Enter Your Message"
							label="Message"
							type="text"
						/>

						<div>
							<ReCAPTCHA
								sitekey="6Lfy7osrAAAAAKEQbDgrdk2DZukA-vfpJGdzsFLK"
								onChange={() => setVerified(true)}
							/>
							<div>
								<SubmitButton
									width="200px"
									height="60px"
								>
									Submit
								</SubmitButton>
								{statusMessage && (
									<p style={{ 
										marginTop: "10px", 
										color: statusType === "success" ? "green" : "red"
									}}>
										{statusMessage}
									</p>
								)}
							</div>
						</div>
						
						{
							loading &&
							<div className={style.loader}>
								<Loader />
							</div>
						}
					</form>
				</div>
			</div>

			{/* footer */}
			<div className={style.footer}>
				<div className={style.container}>
					<div className={style["footer-info"]}>
						<div>
							<h3>Paige MacGregor</h3>
							<p>A Full Stack Developer, skilled at building the frontend, backend, and databases of websites and applications that lead to the success of the overall product</p>
						</div>
						<div className={style.social}>
							<h3>Social</h3>
							<div className="">
								<a className={style.git} target="_blank" href='https://github.com/paigem33' >
									<AiFillGithub size="30px" color='white' />
								</a>
								<a className={style.linkedin} target="_blank" href='https://www.linkedin.com/in/paige-macgregor/' >
									<AiFillLinkedin size="30px" color='white' />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;