import logo from '../me.png'; // Tell Webpack this JS file uses this image


const HomePage = function () {
    return (
        <div className="container-fluid">


            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet"></link>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet"></link>


            <div className="container-fluid">
                <section>
                    <article>
                        <div className="grid" style={{}}>

                            <div className="container-fluid">

                                <img src={logo} alt="" style={{ 'padding': '10%' }}></img>
                                <div class="container-fluid socialMediaRefs">
                                    <a class="contrast socialMedia" href="https://github.com/lichfiet"><i class="contrast fab fa-github"></i></a>
                                    <a class="contrast socialMedia" href="https://www.linkedin.com/in/tlichfield/"><i class="fab fa-linkedin-in"></i></a>
                                </div>

                                <h2 class="">About me</h2>
                                <p class="">On the weekends <i>and sometimes weekdays,</i> I enjoy Bouldering, Video Games, Art, and Programming.
                                    I'm a huge fan of music of all genres, though music from the 60s-90s will always come out on top in my opinion. Sam Cooke, The Smiths, Paul Simon, and
                                    Etta James are a few of my favorite artists. You can find my playlist on my "about me" page. <a href="background.html" class=""><b>Go to...</b></a></p>
                                <p class="" ><a href="background.html" class=""><b>link in paragraph</b></a>.</p>
                            </div>



                            <div className="container-fluid">
                                <h1 class="">Introduction</h1>
                                <p class="< indent">My name is <b>Trevor Lichfield</b>. I'm 19 years old, and an aspiring cloud architect.
                                    My most current project is a container management interface for game servers, and plan to update it regularly, however I've worked on a number
                                    of other projects as well. </p>
                                <h4 class="">Work Experience</h4>
                                <p class="">I'm currently working at <b>Lightspeed DMS LLC</b> as a <b>Customer Support Analyst II</b>
                                    , where my tasks include: client-oriented software troubleshooting, project management, writing SQL statements for data validation and troubleshooting,
                                    and front-end QA reporting amongst many other things. You can read more about them <a href="background.html" class=""><b>here</b></a>.</p>
                                <p class="">Prior work experience extends to food and beverage service, and recreational sport
                                    refereeing. Outside of the professional work envrionment, I've worked heavily in digital media utilizing the Adobe Creative Cloud suite, as well as 3D Animation
                                    and design programs to make digital advertisements for personal and professional use. <a href="background.html" class=""><b>Continue Reading...</b></a></p>

                                <p class="">Personal development of skills has been fostered through an interests in game server configurations and setup,
                                    which naturally led to insterests in hosting solutions and service management. I started with learning command-line CentOS Linux, and naturally started experimenting with
                                    containerized applications and deployment using Docker Compose, and container orechastration via. MiniKube. <a href="background.html" class=""><b>Continue Reading...</b></a></p>


                            </div>
                            <div class="container-fuid">
                                
                                    <h2 class="">Skills and Proficiencies</h2>

                                    <ul class="">
                                        <h3 class="">Programming</h3>
                                        <ul class=""><p class=""><b>Front End Web Development:</b> HTML, CSS, React</p></ul>
                                        <ul class=""><p class=""><b>RESTful API Development:</b> Express.js with Node</p></ul>
                                        <ul class=""><p class=""><b>Querying Languages:</b> Postgres SQL and other MySQL derivatives</p></ul>
                                    </ul>

                                    <ul class="">
                                        <h4 class="">Project Management & Support</h4>
                                        <ul class="list"><p class=""><b>Project Management Tools:</b> Salesforce and Task Ray</p></ul>
                                        <ul class="list"><p class=""><b>CRM:</b> Clarify CRM and Sales Force</p></ul>
                                    </ul>

                                    <ul class="">
                                        <h4 class="">Digital Media</h4>
                                        <ul class="list"><p class=""><b>Graphic Design & Video:</b> Adobe Photoshop, Adobe Lightroom, Adobe Premiere, Adobe After Effects</p></ul>
                                        <ul class="list"><p class=""><b>3D Modeling & Animation:</b> Blender, Cinema4D</p></ul>
                                        <ul class="list"><p class="secondary">Novel Artist</p></ul>
                                    </ul>

                                
                            </div>
                        </div>
                    </article>
                    <article>
                        <h1>Projects</h1>
                        <div className='grid'>
                            <div className='container-fluid'>
                                <h2>File Conv</h2>
                                <div className='container-fluid'>
                                    <details open>
                                        <summary>Summary</summary>
                                        <p>...</p>
                                    </details>
                                </div>
                            </div>
                            <div className='container-fluid'><h2>This Website</h2>
                                <div className='container-fluid'>
                                    <details open>
                                        <summary>Summary</summary>
                                        <p>...</p>
                                    </details>
                                </div></div>
                            <div className='container-fluid'><h2>Other</h2>
                                <div className='container-fluid'>
                                    <details open>
                                        <summary>Summary</summary>
                                        <p>...</p>
                                    </details>
                                </div></div>
                        </div>
                    </article>
                </section>
            </div>
        </div>
    )
}

export default HomePage;