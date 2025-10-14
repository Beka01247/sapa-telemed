import React, { useState } from "react";
import styles from "./index.module.css";

// Helper function to calculate age
const calculateAge = (birthDate: string | null): number => {
  if (!birthDate) {
    return 0;
  }
  const parts = birthDate.split("/");
  if (parts.length !== 3) {
    return 0;
  }
  const birth = new Date(parts.reverse().join("-"));
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
  "Политопная экстрасистолия",
  "Пароксизмальная тахикардия наджелудочковая",
  "Желудочковая тахикардия",
  "Синдром Фридерика",
  "Фибрилляция желудочков",
  "Атриовентрикулярная блокада 3-й степени (полная)",
  "Синдром удлиненного Q-T",
];

const orangeConditions = [
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
  "Искусственный водитель ритма",
  "Нарушения проводимости",
  "Синоатриальная блокада неполная",
  "Синоатриальная блокада полная",
  "Атриовентрикулярная блокада 1-й степени",
  "Атриовентрикулярная блокада 2-й степени",
  "Неполная блокада правой ветви пучка Гиса",
  "Полная блокада правой ветви пучка Гиса",
  "Блокада левой ножки пучка Гиса",
  "Блокада передней левой ветви пучка Гиса",
  "Блокада задней левой ветви пучка Гиса",
  "Синдром WPW",
  "Синдром укороченного PQ",
];

const yellowConditions = [
  "Инфаркт миокарда без зубца Q рубцовые изменения",
  "Инфаркт миокарда без зубца Q очаговые изменения миокарда",
  "Признаки хронической коронарной недостаточности (с учетом клиники)",
  "Локализация",
  "передне-перегородочная",
  "передне-верхушечная",
  "боковая",
  "задне-нижняя",
  "задне-базальная",
  "Некоронарогенные изменения миокарда",
  "Синдром ранней реполяризации желудочков",
  "Диффузные изменения процессов реполяризации",
  "Признаки дигиталисной интоксикации",
  "Легочное сердце (SIQIII)",
  "Гипертрофии",
  "Гипертрофия правого предсердия",
  "Гипертрофия левого предсердия",
  "Гипертрофия правого желудочка",
  "С нарушением процессов реполяризации",
];

const lvhConditions = [
  "Гипертрофия левого желудочка",
  "Нарушение реполяризаций нижн ст, боковые",
  "Неспециф измен зубца Т по нижней и передне-перегородочной ст"
];

const blackConditions = [
  "Нарушение коронарного кровообращения",
  "Ишемия миокарда",
  "Повреждение миокарда субэндокардиальное",
  "Повреждение миокарда трансмуральное",
  "Инфаркт миокарда с зубцом Q",
  "Инфаркт миокарда без зубца Q острый период",
  "Инфаркт миокарда без зубца Q подострый период",
];

// Patient Details Component
interface PatientDetailsListProps {
  ecgData: any[];
  filteredPatients: any[] | null;
  setFilteredPatients: (patients: any[] | null) => void;
}

const PatientDetailsList: React.FC<PatientDetailsListProps> = ({ ecgData, filteredPatients, setFilteredPatients }) => {
  const [filter, setFilter] = useState<string | null>(null);

  const filteredData = ecgData.filter((patient) => {
    const description = patient.ecgDescription.toLowerCase();
    if (redConditions.some((condition) => description.includes(condition.toLowerCase()))) {
      patient.severity = "red";
      return filter === null || filter === "red";
    }
    if (orangeConditions.some((condition) => description.includes(condition.toLowerCase()))) {
      patient.severity = "orange";
      return filter === null || filter === "orange";
    }
    if (yellowConditions.some((condition) => description.includes(condition.toLowerCase()))) {
      patient.severity = "yellow";
      return filter === null || filter === "yellow";
    }
    if (blackConditions.some((condition) => description.includes(condition.toLowerCase()))) {
      patient.severity = "black";
      return filter === null || filter === "black";
    }
    if (lvhConditions.some((condition) => description.includes(condition.toLowerCase()))) {
      patient.severity = "lvh";
      return filter === null || filter === "lvh";
    }
    return false;
  });

  // Sort by severity (red, orange, black, yellow, lvh)
  filteredData.sort((a, b) => {
    const order = ["red", "orange", "black", "yellow", "lvh"];
    return order.indexOf(a.severity) - order.indexOf(b.severity);
  });

  const dataToDisplay = filteredPatients || filteredData;

  return (
    <div className={styles.scrollableContainer}>
      <h2 className={styles.patientListTitle}>Список обследованных пациентов</h2>
      <h3 className={styles.patientListSubTitle}>(Нажмите на столб с диагнозом, чтобы увидеть пациентов в таблице)</h3>
      <div className={styles.filterButtons}>
        <button onClick={() => { setFilter(null); setFilteredPatients(null); }}>Все</button>
        <button onClick={() => { setFilter("yellow"); setFilteredPatients(null); }}>Патологии</button>
        <button onClick={() => { setFilter("orange"); setFilteredPatients(null); }}>Аритмии</button>
        <button onClick={() => { setFilter("red"); setFilteredPatients(null); }}>Жизнеугрожающие аритмии</button>
        <button onClick={() => { setFilter("black"); setFilteredPatients(null); }}>ОКС</button>
        <button onClick={() => { setFilter("lvh"); setFilteredPatients(null); }}>Гипертония</button>
      </div>
      {dataToDisplay.length > 0 ? (
        <table className={styles.patientTable}>
          <thead>
            <tr>
              <th>Дата и Время ЭКГ</th>
              <th>Возраст</th>
              <th>Пол</th>
              <th>ИИН</th>
              <th>Отделение</th>
              <th>Описание ЭКГ</th>
              <th>Ссылка</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {dataToDisplay.map((patient, index) => (
              <tr key={index}>
                <td>
                  {new Date(patient.ecgDate).toLocaleDateString()}{" "}
                  {new Date(patient.ecgDate).toLocaleTimeString("en-GB")}
                </td>
                <td>{patient.bDate ? calculateAge(patient.bDate) : "-"}</td>
                <td>{patient.sex  || "-"}</td>
                <td>{patient.iin  || "-"}</td>
                <td>{patient.orgDivision || "-"}</td>
                <td>{patient.ecgDescription}</td>
                <td>
                  <a href={patient.ecgLink} target="_blank" rel="noopener noreferrer">
                    Просмотр
                  </a>
                </td>
                <td>
  {["red", "orange", "yellow", "black", "lvh"].includes(patient.severity) ? (
    <span
      style={{
        display: "inline-block",
        width: "18px",
        height: "18px",
        borderRadius: "50%",
        backgroundColor:
          patient.severity === "red"
            ? "#f44336"
            : patient.severity === "orange"
            ? "#ff9800"
            : patient.severity === "yellow"
            ? "#ffeb3b"
            : patient.severity === "black"
            ? "#424242"
            : patient.severity === "lvh"
            ? "#bc37d3"
            : "#81c784",
        margin: "16px",
      }}
    ></span>
  ) : (
    // Display label directly if it's not a color
    <span>{patient.severity}</span>
  )}
</td>


              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: "center", color: "#000", marginTop: "1rem" }}>
          Нет данных для отображения
        </p>
      )}
    </div>
  );
};

export default PatientDetailsList;
