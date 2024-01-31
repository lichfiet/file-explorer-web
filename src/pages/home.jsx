import logo from '../me.png'; // Tell Webpack this JS file uses this image


const HomePage = function () {
    return (

        /** first bit */
                <div className='container '>
                    <article className='homeIntroContainer'>
                        <div className='container-fluid homeIntro'>
                            <div>
                                <header className=''>
                                    <h3 className="">Introduction</h3>
                                    <p class="-text">My name is <b>Trevor Lichfield</b>. I'm 19 years old, and an aspiring cloud architect.
                                        My most current project is a container management interface for game servers, and plan to update it regularly, however I've worked on a number
                                        of other projects as well. </p>
                                </header>
                            </div>
                            <div>
                                <div><button>test</button></div>
                                <div><button>test</button></div>
                                <div><button>test</button></div>
                                <div><button>test</button></div>
                                <div><button>test</button></div>
                            </div>
                        </div>
                    </article>
              
          






            <div className="container">
                <div className='container-fluid'>
                    <section>
                        <div className="grid" style={{ 'grid-template-columns': '3fr 1fr' }}>
                            <article className='overrideArticle'>
                                <div className="container-fluid">
                                    <hgroup>
                                    <h5 className="overrideHeading">Work Experience</h5>
                                    </hgroup>
                                    <p class="white-text">I'm currently working at <b>Lightspeed DMS LLC</b> as a <b>Customer Support Analyst II</b>
                                        , where my tasks include: client-oriented software troubleshooting, project management, writing SQL statements for data validation and troubleshooting,
                                        and front-end QA reporting amongst many other things. You can read more about them <a href="background.html" class=""><b>here</b></a>.</p>
                                    <p class="white-text">Prior work experience extends to food and beverage service, and recreational sport
                                        refereeing. Outside of the professional work envrionment, I've worked heavily in digital media utilizing the Adobe Creative Cloud suite, as well as 3D Animation
                                        and design programs to make digital advertisements for personal and professional use. <a href="background.html" class=""><b>Continue Reading...</b></a></p>

                                    <p class="white-text">Personal development of skills has been fostered through an interests in game server configurations and setup,
                                        which naturally led to insterests in hosting solutions and service management. I started with learning command-line CentOS Linux, and naturally started experimenting with
                                        containerized applications and deployment using Docker Compose, and container orechastration via. MiniKube. <a href="background.html" class=""><b>Continue Reading...</b></a></p>


                                </div>
                            </article>
                            <article className='overrideArticle'>
                                <div class="container-fuid">
                                    <div className="container-fluid">

                                        <img src={logo} alt="" style={{ 'padding': '10%' }} className='portrait'></img>
                                        <div class="container-fluid socialMediaRefs">
                                            <a class="contrast socialMedia" href="https://github.com/lichfiet"><i class="contrast fab fa-github"></i></a>
                                            <a class="contrast socialMedia" href="https://www.linkedin.com/in/tlichfield/"><i class="fab fa-linkedin-in"></i></a>
                                        </div>

                                        <h3 className="overrideHeading">About me</h3>
                                        <p class="white-text">On the weekends <i>and sometimes weekdays,</i> I enjoy Bouldering, Video Games, Art, and Programming.
                                            I'm a huge fan of music of all genres, though music from the 60s-90s will always come out on top in my opinion. Sam Cooke, The Smiths, Paul Simon, and
                                            Etta James are a few of my favorite artists. You can find my playlist on my "about me" page. <a href="background.html" class=""><b>Go to...</b></a></p>
                                        <p class="white-text" ><a href="background.html" class=""><b>link in paragraph</b></a>.</p>
                                    </div>

                                    <h3 className="overrideHeading">Skills and Proficiencies</h3>

                                    <ul class="">
                                        <h4 className="overrideHeading">Programming</h4>
                                        <ul class=""><p class="white-text"><b>Front End Web Development:</b> HTML, CSS, React</p></ul>
                                        <ul class=""><p class="white-text"><b>RESTful API Development:</b> Express.js with Node</p></ul>
                                        <ul class=""><p class="white-text"><b>Querying Languages:</b> Postgres SQL and other MySQL derivatives</p></ul>
                                    </ul>

                                    <ul class="">
                                        <h5 className="overrideHeading">Project Management & Support</h5>
                                        <ul class="list"><p class="white-text"><b>Project Management Tools:</b> Salesforce and Task Ray</p></ul>
                                        <ul class="list"><p class="white-text"><b>CRM:</b> Clarify CRM and Sales Force</p></ul>
                                    </ul>

                                    <ul class="">
                                        <h5 className="overrideHeading">Digital Media</h5>
                                        <ul class="list"><p class="white-text"><b>Graphic Design & Video:</b> Adobe Photoshop, Adobe Lightroom, Adobe Premiere, Adobe After Effects</p></ul>
                                        <ul class="list"><p class="white-text"><b>3D Modeling & Animation:</b> Blender, Cinema4D</p></ul>
                                        <ul class="list"><p class="secondary">Novel Artist</p></ul>
                                    </ul>


                                </div>
                            </article>
                        </div>

                    </section>
                </div>
            </div>

        </div >
    )
}

export default HomePage;