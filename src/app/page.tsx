"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import GraphOne from "@/components/GraphOne";

const Component2 = () => <div>Component 2 Content</div>;
const Component3 = () => <div>Component 3 Content</div>;
const Component4 = () => <div>Component 4 Content</div>;

export default function Home() {
  const [activeComponent, setActiveComponent] = useState<number>(1);

  const renderComponent = () => {
    switch (activeComponent) {
      case 1:
        return <GraphOne />;
      case 2:
        return <Component2 />;
      case 3:
        return <Component3 />;
      case 4:
        return <Component4 />;
      default:
        return <GraphOne />;
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Результаты телеметрии Sapa Telemed</h1>
      
      <div className={styles.switcher}>
        <button
          className={`${styles.button} ${
            activeComponent === 1 ? styles.activeButton : ""
          }`}
          onClick={() => setActiveComponent(1)}
        >
          Общие результаты пациентов
        </button>
        <button
          className={`${styles.button} ${
            activeComponent === 2 ? styles.activeButton : ""
          }`}
          onClick={() => setActiveComponent(2)}
        >
          Component 2
        </button>
        <button
          className={`${styles.button} ${
            activeComponent === 3 ? styles.activeButton : ""
          }`}
          onClick={() => setActiveComponent(3)}
        >
          Component 3
        </button>
        <button
          className={`${styles.button} ${
            activeComponent === 4 ? styles.activeButton : ""
          }`}
          onClick={() => setActiveComponent(4)}
        >
          Component 4
        </button>
      </div>

      {/* Render Active Component */}
      <div className={styles.componentContainer}>{renderComponent()}</div>
    </div>
  );
}
