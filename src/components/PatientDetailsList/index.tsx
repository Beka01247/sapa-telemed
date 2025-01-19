import React from "react";
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

// Patient Details Component
const PatientDetailsList: React.FC<{ ecgData: any[] }> = ({ ecgData }) => {
  return (
    <div className={styles.scrollableContainer}>
      <h2 className={styles.patientListTitle}>Список пациентов</h2>
      <table className={styles.patientTable}>
        <thead>
          <tr>
            <th>Дата и Время ЭКГ</th>
            <th>Возраст</th>
            <th>Пол</th>
            <th>ИИН</th>
            <th>Описание ЭКГ</th>
            <th>Ссылка</th>
          </tr>
        </thead>
        <tbody>
          {ecgData.map((patient, index) => (
            <tr key={index}>
              <td>
                {new Date(patient.ecgDate).toLocaleDateString()}{" "}
                {new Date(patient.ecgDate).toLocaleTimeString("en-GB")}{" "}
                {/* 24-hour format */}
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientDetailsList;
