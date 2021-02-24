import React from "react";
import Avatar from "../../../images/avatar.jpg";
import "./AboutMe.css";

function AboutMe() {
  return (
    <section className="about-me main__section main__section_pv_110">
      <h2 className="about-me__title main__section-title main__section-title_mb_66">Студент</h2>
      <p className="about-me__name">Алексей</p>
      <p className="about-me__profession">Фронтенд-разработчик, {(new Date).getFullYear() - 1995} лет</p>
      <p className="about-me__description">
        Я родился в Удмуртии и сейчас живу в Ижевске. Получить высшее образование в ИжГТУ на факультете ИВТ. На данный момент собираюсь переезжать в Санкт-Петербург.
        До фронтунда 4 года работал 1С программистом.
        Регулярно занимаюсь самообразованием и освоением нового материала. На данный момент подписан и читаю журнал "КОД" от Яндекс.Практикума,
        смотрю на ютубе серии уроков по React на канале IT-KAMASUTRA, читаю книгу "Грокаем алгоритмы" и еще регулярно занимаюсь английским на платформе SkyEng,
        а также учусь играть на гитаре =)
      </p>
      <ul className="about-me__links">
        <li>
          <a href="https://vk.com/aleksey28" target="_blank" className="about-me__link">ВКонтакте</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/%D0%B0%D0%BB%D0%B5%D0%BA%D1%81%D0%B5%D0%B9-%D0%BF%D0%BE%D0%BF%D0%BE%D0%B2-28b9b5201/"
             target="_blank"
             className="about-me__link">LinkedIn</a>
        </li>
        <li>
          <a href="https://github.com/Aleksey28" target="_blank" className="about-me__link">GitHub</a>
        </li>
        <li>
          <a href="https://www.codewars.com/users/Aleksey28" target="_blank" className="about-me__link">CodeWars</a>
        </li>
        <li>
          <a href="https://www.hackerrank.com/Alekseypopow1995"
             target="_blank"
             className="about-me__link">HackerRank</a>
        </li>
      </ul>
      <img src={Avatar} alt="Фотография создателя." className="about-me__avatar"/>
    </section>
  );
}

export default AboutMe;
