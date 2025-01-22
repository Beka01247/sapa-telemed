import React, { useState } from "react";
import styles from "./index.module.css";

// Helper function to calculate age
const calculateAge = (birthDate: string): number => {
  const birth = new Date(birthDate.split("/").reverse().join("-"));
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

// Conditions lists
const redConditions = [
  "Брадиаритмии",
  "Синдром слабости синусового узла (остановка синусового узла)",
  "AV-блокада 2-й степени типа Мобитц",
  "Полная AV-блокада",
  "Тахиаритмии",
  "Пароксизмальная желудочковая тахикардия",
  "ЖТ типа «пируэт» torsades de pointes",
  "Желудочковые экстрасистолы (плитопные ЖЭС, ранние ЖЭС по типу R на Т)",
  "Синдром бругада",
  "Long QT",
];

const yellowConditions = [
  "Синусовая брадикардия",
  "Синусовая тахикардия",
  "Синусовая аритмия",
  "Фибрилляция (мерцание) предсердий",
  "нормосистолическая форма",
  "тахисистолическая форма",
  "Трепетание предсердий, правильная форма",
  "Трепетание предсердий, неправильная форма",
  "Экстрасистолия наджелудочковая",
  "Экстрасистолия желудочковая",
  "единичные экстрасистолы",
  "парные экстрасистолы",
  "групповые экстрасистолы",
  "вставочные экстрасистолы",
  "аллоритмия",
  "Политопная экстрасистолия",
  "Пароксизмальная тахикардия наджелудочковая",
  "Желудочковая тахикардия",
  "Синдром Фридерика",
  "Фибрилляция желудочков",
  "Искусственный водитель ритма",
  "Синоатриальная блокада неполная",
  "Синоатриальная блокада полная",
  "Атриовентрикулярная блокада 1-й степени",
  "Атриовентрикулярная блокада 2-й степени",
  "Атриовентрикулярная блокада 3-й степени (полная)",
  "Неполная блокада правой ветви пучка Гиса",
  "Полная блокада правой ветви пучка Гиса",
  "Блокада левой ножки пучка Гиса",
  "Блокада передней левой ветви пучка Гиса",
  "Блокада задней левой ветви пучка Гиса",
  "Синдром WPW",
  "Синдром укороченного PQ",
  "Ишемия миокарда",
  "Повреждение миокарда",
  "субэндокардиальное",
  "трансмуральное",
  "Инфаркт миокарда с зубцом Q",
  "Инфаркт миокарда без зубца Q",
  "острый период",
  "подострый период",
  "рубцовые изменения",
  "очаговые изменения миокарда",
  "Признаки хронической коронарной недостаточности",
  "передне-перегородочная",
  "передне-верхушечная",
  "боковая",
  "задне-нижняя",
  "задне-базальная",
  "Синдром ранней реполяризации желудочков",
  "Синдром удлиненного Q-T",
  "Диффузные изменения процессов реполяризации",
  "Признаки дигиталисной интоксикации",
  "Легочное сердце (SIQIII)",
  "Гипертрофия правого предсердия",
  "Гипертрофия левого предсердия",
  "Гипертрофия правого желудочка",
  "Гипертрофия левого желудочка",
  "С нарушением процессов реполяризации",
];

// Patient Details Component
const PatientDetailsList: React.FC<{ ecgData: any[] }> = ({ ecgData }) => {
  const [filter, setFilter] = useState<string | null>(null);

  const filteredData = ecgData.filter((patient) => {
    const description = patient.ecgDescription.toLowerCase();
    if (redConditions.some((condition) => description.includes(condition.toLowerCase()))) {
      patient.severity = "red";
      return filter === null || filter === "red";
    }
    if (yellowConditions.some((condition) => description.includes(condition.toLowerCase()))) {
      patient.severity = "yellow";
      return filter === null || filter === "yellow";
    }
    return false;
  });

  // Sort by severity (red first, then yellow)
  filteredData.sort((a, b) => {
    if (a.severity === "red" && b.severity === "yellow") return -1;
    if (a.severity === "yellow" && b.severity === "red") return 1;
    return 0;
  });

  return (
    <div className={styles.scrollableContainer}>
      <h2 className={styles.patientListTitle}>Список пациентов</h2>
      <div className={styles.filterButtons}>
        <button onClick={() => setFilter(null)}>Все</button>
        <button onClick={() => setFilter("red")}>Только красные</button>
        <button onClick={() => setFilter("yellow")}>Только желтые</button>
      </div>
      {filteredData.length > 0 ? (
        <table className={styles.patientTable}>
          <thead>
            <tr>
              <th>Дата и Время ЭКГ</th>
              <th>Возраст</th>
              <th>Пол</th>
              <th>ИИН</th>
              <th>Описание ЭКГ</th>
              <th>Ссылка</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((patient, index) => (
              <tr key={index}>
                <td>
                  {new Date(patient.ecgDate).toLocaleDateString()} {" "}
                  {new Date(patient.ecgDate).toLocaleTimeString("en-GB")} {" "}
                </td>
                <td>{calculateAge(patient.bDate)}</td>
                <td>{patient.sex}</td>
                <td>{patient.iin}</td>
                <td>{patient.ecgDescription}</td>
                <td>
                  <a
                    href={patient.ecgLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Просмотр
                  </a>
                </td>
                <td>
                  <span
                    style={{
                      display: "inline-block",
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      backgroundColor: patient.severity === "red" ? "#f44336" : "#ffeb3b",
                      margin: "16px",
                    }}
                  ></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: "center", color: "#000", marginTop: "1rem" }}>Нет данных для отображения</p>
      )}
    </div>
  );
};

export default PatientDetailsList;
