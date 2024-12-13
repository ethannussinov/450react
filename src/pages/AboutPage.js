import React, { useState } from "react";
// import { API_ENDPOINTS } from "../constants/constants";
import "./AboutPage.css"
import groupPhoto from "../groupPhoto.jpg"

function Collapsible({ title, content }) {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
          <button onClick={toggle} className="collapsible-header">
            {title}
          </button>
          {isOpen && (
            <div className="collapsible-content">
              {content}
            </div>
          )}
        </div>
      );
  }

const AboutPage = () => {

    return (
        <div className="container mt-4">
            <h1 className="text-center">About the STL School Discipline Dashboard</h1>
            <p>This project aims to serve as a visualization tool to support analysis of school discipline and demographics data 
                in fourteen school districts across St. Louis city and St. Louis county, utilizing data from the Missouri Department
                 of Elementary and Secondary Education (DESE).</p>
            <p>This project was spearheaded through a collaboration between the Legal Services of Eastern Missouri's Education Justice
                Program (EJP) and Washington University in St. Louis through the Engineers in the Community (Engr 450F) course during 
                Fall 2024.</p>

            <Collapsible
                title="About the Data"
                content={
                    <>
                    <p>Data pulled for this website was primarily from <a href="https://apps.dese.mo.gov/MCDS/home.aspx" target="_blank" 
                        rel="noopener noreferrer">DESE's Missouri Comprehensive Data System (MCDS)</a>. Datasets processed for use here
                        include:</p>
                        <li>District adjusted cohort graduation rates</li>
                        <li>District annual dropout rates</li>
                        <li>District graduate follow-up</li>
                        <li>District ACT results</li>
                        <li>District proportional attendance rates</li>
                        <li>District demographic data</li>
                        <li>District discipline incidents</li>
                        <li>District homelessness data (downloaded as a PDF and converted to an Excel file for processing)</li>
                        <li>Finance data and statistics summary for all districts/charters</li>
                    <p>Excel files (except for PDFs when noted) were downloaded and processed utilizing MATLAB to ensure that all
                        datasets had a consistent format.</p>
                    <p>Additional statewide and national average data was taken from the <a href="https://civilrightsdata.ed.gov/" 
                        target="_blank" rel="noopener noreferrer">Civil Rights Data Collection database</a> run by the U.S. Department
                        of Education Office of Civil Rights.</p>
                    </>
                }
            />
            <Collapsible
                title="About the Legal Services of Eastern Missouri"
                content={
                    <>
                    <p>The Legal Services of Eastern Missouri (LSEM) advances justice through legal representation, education and 
                        supportive services. They partner with the community to improve lives, promote fairness and create opportunities 
                        for those in need.</p>
                    <p>The Education Justice Program is a part of LSEM's Health Justice Initiative that works to disrupt the 
                        “School-to-Prison-Pipeline” by ensuring that every child receives a good education, in a safe school, no matter 
                        what a child looks like or where a child is from.</p>
                    <p>Learn more about the Legal Services of Eastern Missouri and EJP via their websites:</p>
                        <li><a href="https://lsem.org/" target="_blank" rel="noopener noreferrer">Legal Services of Eastern Missouri</a></li>
                        <li><a href="https://lsem.org/education-justice-program/" target="_blank" rel="noopener noreferrer">Education Justice Program</a></li>
                    </>
                }
            />

            <Collapsible
                title="About the WashU Team"
                content={
                    <>
                    <p>The WashU team was connected with the Legal Services of Eastern Missouri via the Engineers in the Community 
                        course (Engr 450), housed in WashU's McKelvey School of Engineering. The team provided the technical knowledge 
                        and hours of work to process the data and develop this website. The team consists of:</p>
                        <li>Miranda, a senior in electrical engineering</li>
                        <li>Jane, a senior in biomedical engineering</li>
                        <li>Tracy, a senior in chemistry and data science</li>
                        <li>Ethan, a senior in data science</li>
                        <li>Weikai, a master's student in computer science</li>
                    <p>We, the team, would like to thank Professors Seema Dahlheimer and Atia Thurman for their work this semester 
                        planning fascinating, deeply thought-provoking experiences. This course has illustrated the impact that 
                        engineers can make on local organizations, like LSEM, that do incredibly important work building communities 
                        and advocating for their needs.</p>
                    <p>Most importantly, we would like to thank the entire EJP organization and LSEM for their support and 
                        guidance this semester. We especially want to extend our gratitude to Christina Brimm, Hopey Fink, Sarah 
                        Freymiller, and Amanda Schneider for their willingness to learn alongside our team and enthusiasm about this 
                        project. We are incredibly thankful that we had the opportunity to work with with you this semester!
                    </p>
                    <img
                        src={groupPhoto}
                        alt="A photo of the WashU students who worked on this project"
                        style={{ width: '500px', height: '375px', objectFit: 'cover', borderRadius: '15px' }} // how to center?? lol
                    />
                    </>
                }
            />
        </div>


    );

}

export default AboutPage;