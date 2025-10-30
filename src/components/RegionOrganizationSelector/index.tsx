import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RegionOrganization.css";

export interface Region {
  id: number;
  region_name: string;
}

export interface Organization {
  site_name: string;
  commercial_name: string;
  region_id: number;
}

export interface ApiOrganization {
  orgHealthCareID: string;
  orgHealthCareName: string;
  sitE_NAME: string;
  regionID: number;
  regionName: string;
}

interface RegionOrganizationSelectorProps {
  region: number | null;
  setRegion: (region: number | null) => void;
  organization: string;
  setOrganization: (organization: string) => void;
  regions: Region[];
  organizations: Organization[];
  isLoading: boolean;
  error: string | null;
}

// Function to fetch token
const fetchToken = async (): Promise<string | null> => {
  try {
    const response = await axios.post(
      "https://client.sapatelemed.kz/ecgList/token",
      null,
      {
        params: {
          username: "webStat",
          password: "QupiyaSozWebPageBirBir",
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
};

// Function to fetch organizations from API
const fetchOrganizations = async (): Promise<{ regions: Region[], organizations: Organization[] } | null> => {
  try {
    const token = await fetchToken();
    if (!token) {
      console.error("Failed to fetch authorization token");
      return null;
    }

    const response = await axios.get<ApiOrganization[]>(
      "https://client.sapatelemed.kz/ecgList/api/Organization",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Transform API data to match our interfaces
    const apiData = response.data;
    
    // Extract unique regions
    const regionMap = new Map<number, string>();
    apiData.forEach(org => {
      regionMap.set(org.regionID, org.regionName);
    });
    
    const regions: Region[] = Array.from(regionMap.entries()).map(([id, name]) => ({
      id,
      region_name: name
    })).sort((a, b) => a.id - b.id);

    // Transform organizations
    const organizations: Organization[] = apiData.map(org => ({
      site_name: org.sitE_NAME,
      commercial_name: org.orgHealthCareName,
      region_id: org.regionID
    }));

    return { regions, organizations };
  } catch (error) {
    console.error("Error fetching organizations:", error);
    return null;
  }
};

export function getRegionIdForOrgId(orgId: string, organizations: Organization[]): number | null {
  const org = organizations.find((o) => o.site_name === orgId);
  return org ? org.region_id : null;
}



const RegionOrganizationSelector: React.FC<RegionOrganizationSelectorProps> = ({
  region,
  setRegion,
  organization,
  setOrganization,
  regions,
  organizations,
  isLoading,
  error,
}) => {

  const filteredOrganizations = organizations.filter(
    (org: Organization) => org.region_id === region
  );

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const regionId = parseInt(e.target.value, 10);
    setRegion(regionId);
    setOrganization(""); // Reset organization when the region changes
  };

  const handleOrganizationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrganization(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="region-organization-container">
        <p>Загрузка регионов и организаций...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="region-organization-container">
        <p>Ошибка загрузки данных: {error}</p>
      </div>
    );
  }

  return (
    <div className="region-organization-container">
      <div
        className={`region-container ${
          !region && !organization ? "highlight-country" : ""
        }`}
      >
        <label className="label">Страна:</label>
        <div className="fixed-region">Республика Казахстан</div>
      </div>

      <div
        className={`region-dropdown ${
          region && !organization ? "highlight-region" : ""
        }`}
      >
        <label htmlFor="region" className="label">Область / город:</label>
        <select
          id="region"
          value={region || ""}
          onChange={handleRegionChange}
          className="select"
        >
          <option value="" disabled>
            -- Выберите область/город --
          </option>
          {regions.map((regionItem: Region) => (
            <option key={regionItem.id} value={regionItem.id}>
              {regionItem.region_name}
            </option>
          ))}
        </select>
        <p className="note">* Выбрать при необходимости</p>
      </div>

      <div
        className={`organization-dropdown ${
          region && organization ? "highlight-organization" : ""
        }`}
      >
        <label htmlFor="organization" className="label">Организация:</label>
        <select
          id="organization"
          value={organization}
          onChange={handleOrganizationChange}
          className="select"
        >
          <option value="" disabled>
            -- Выберите организацию --
          </option>
          {filteredOrganizations.map((org: Organization) => (
            <option key={org.site_name} value={org.site_name}>
              {org.commercial_name}
            </option>
          ))}
        </select>
        <p className="note">* Выбрать при необходимости</p>
      </div>
    </div>
  );
};

// Export for use in other components
export { fetchOrganizations };

export default RegionOrganizationSelector;
