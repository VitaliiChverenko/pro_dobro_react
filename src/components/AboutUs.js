import React from 'react';
import { Segment, Image } from 'semantic-ui-react'
import team1 from '../media/images/team.jpg';
import team2 from '../media/images/team.gif';

const AboutUs = () => {
  return (
    <div className="ui container styleAboutUs">
      <h1>History of CARE</h1>
      <h5>PUBLICATION INFO</h5>
      <p>Our origins</p>

      <Segment>
        <Image src={team1} size='medium' floated='left' />
        <p>
          CARE was founded in 1945, when 22 American organizations came together to rush 
          lifesaving CARE Packages® to survivors of World War II. Thousands of Americans, 
          including President Harry S. Truman, contributed to the effort. On May 11, 1946, 
          the first 15,000 packages were delivered to World War II survivors in Le Havre, France.
        </p>
        <Image src={team2} size='medium' floated='right' />
        <p>
          These early packages were U.S. Army surplus "10-in-1" food parcels intended to provide 
          one meal for 10 soldiers during the planned invasion of Japan. We obtained them at the end 
          of the war and began a service that let Americans send the packages to friends and families 
          in Europe, where millions were in danger of starvation. Ten dollars bought a CARE Package and 
          guaranteed that its addressee would receive it within four months.
        </p>
        <p>
          When the "10-in-1" parcels ran out, we began assembling our own food packages, 
          greatly assisted by donations from American companies. At first, senders had to 
          designate a specific person as the recipient, but soon CARE was flooded with donations 
          to send CARE Packages to "a hungry occupant of a thatched cottage," "a school teacher 
          in Germany," and so on.
          <br />
          Later packages included carpentry tools, blankets, clothes, books, school supplies and 
          medicine – and we expanded delivery to other regions in need including Asia and Latin America.
        </p>
        <p><strong>CARE Package phased out</strong></p>
        <p>
          Decades ago, we largely phased out the CARE Package as we expanded the breadth of our work 
          to focus on long-term projects in addition to emergency relief. However, the CARE Package 
          remained a powerful symbol of the compassion and generosity of those who support CARE's 
          vision of a world free of poverty and suffering.
        </p>
        <p><strong>CARE today</strong></p>
        <p>
          Today, CARE is a leading humanitarian organization fighting global poverty. 
          We place special focus on working alongside poor women because, equipped with the proper 
          resources, women have the power to help whole families and entire communities escape poverty. 
          Women are at the heart of CARE's community-based efforts to improve basic education, 
          prevent the spread of HIV, increase access to clean water and sanitation, expand economic 
          opportunity and protect natural resources. CARE also delivers emergency aid to survivors of 
          war and natural disasters, and helps people rebuild their lives.
        </p>
      </Segment>
    </div>
  );
}

export default AboutUs;
