import React from "react";

interface Region {
  id: number;
  region_name: string;
}

interface Organization {
  site_name: string;
  commercial_name: string;
  region_id: number;
}

const regions: Region[] = [
  { id: 1, region_name: "АКМОЛИНСКАЯ ОБЛАСТЬ" },
  { id: 2, region_name: "АКТЮБИНСКАЯ ОБЛАСТЬ" },
  { id: 3, region_name: "АЛМАТИНСКАЯ ОБЛАСТЬ" },
  { id: 16, region_name: "АСТАНА" },
  // Add the rest of the regions here...
];

const organizations: Organization[] = [
  { site_name: "AKT01", commercial_name: "ГКП \"Айтекебийская РБ\"", region_id: 2 },
  { site_name: "AKT02", commercial_name: "ГКП \"Каргалинская РБ\"", region_id: 2 },
  { site_name: "AL01", commercial_name: "ГКП \"Городская многопрофильная больница\"", region_id: 3 },
  { site_name: "AST01", commercial_name: "ТОО \"ЦЕНТР СЕМЕЙНОГО ЗДОРОВЬЯ\"", region_id: 16 },
  { site_name: 'ASTGP9', commercial_name: 'ГКП на ПХВ "Городская поликлиника №9" акимата города Астана', region_id: 16 },
  // Add the rest of the organizations here...
];

interface RegionOrganizationSelectorProps {
  region: number | null;
  setRegion: (region: number | null) => void;
  organization: string;
  setOrganization: (organization: string) => void;
}

const RegionOrganizationSelector: React.FC<RegionOrganizationSelectorProps> = ({
  region,
  setRegion,
  organization,
  setOrganization,
}) => {
  const filteredOrganizations = organizations.filter(
    (org) => org.region_id === region
  );

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const regionId = parseInt(e.target.value, 10);
    setRegion(regionId);
    setOrganization(""); // Reset organization when the region changes
  };

  const handleOrganizationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrganization(e.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor="region">Выберите регион:</label>
        <select
          id="region"
          value={region || ""}
          onChange={handleRegionChange}
        >
          <option value="" disabled>
            -- Выберите регион --
          </option>
          {regions.map((region) => (
            <option key={region.id} value={region.id}>
              {region.region_name}
            </option>
          ))}
        </select>
      </div>

      {region && (
        <div>
          <label htmlFor="organization">Выберите организацию:</label>
          <select
            id="organization"
            value={organization}
            onChange={handleOrganizationChange}
          >
            <option value="" disabled>
              -- Выберите организацию --
            </option>
            {filteredOrganizations.map((org) => (
              <option key={org.site_name} value={org.site_name}>
                {org.commercial_name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default RegionOrganizationSelector;
