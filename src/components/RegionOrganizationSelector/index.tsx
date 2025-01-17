import React, { useState } from 'react';

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
  { id: 1, region_name: 'АКМОЛИНСКАЯ ОБЛАСТЬ' },
  { id: 2, region_name: 'АКТЮБИНСКАЯ ОБЛАСТЬ' },
  { id: 3, region_name: 'АЛМАТИНСКАЯ ОБЛАСТЬ' },
  { id: 16, region_name: 'АСТАНА' },
  // Add the rest of the regions here...
];

const organizations: Organization[] = [
  { site_name: 'AKT01', commercial_name: 'ГКП "Айтекебийская РБ" на ПХВ ГУ УЗ Актюбинской области', region_id: 2 },
  { site_name: 'AKT02', commercial_name: 'ГКП "Каргалинская РБ" на ПХВ ГУ УЗ Актюбинской области', region_id: 2 },
  { site_name: 'AL01', commercial_name: 'ГКП на ПХВ "Городская многопрофильная больница города Қонаев"', region_id: 3 },
  { site_name: 'AST01', commercial_name: 'ТОО "ЦЕНТР СЕМЕЙНОГО ЗДОРОВЬЯ И СЧАСТЬЯ "ОНЕГЕ"', region_id: 16 },
  { site_name: 'ASTGP9', commercial_name: 'ГКП на ПХВ "Городская поликлиника №9" акимата города Астана', region_id: 16 },
  // Add the rest of the organizations here...
];

interface RegionOrganizationSelectorProps {
  onOrganizationSelect: (orgId: string) => void;
}

const RegionOrganizationSelector: React.FC<RegionOrganizationSelectorProps> = ({ onOrganizationSelect }) => {
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [selectedOrganization, setSelectedOrganization] = useState<string | null>(null);

  const filteredOrganizations = organizations.filter(
    (org) => org.region_id === selectedRegion
  );

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const regionId = parseInt(e.target.value, 10);
    setSelectedRegion(regionId);
    setSelectedOrganization(null); // Reset organization selection
  };

  const handleOrganizationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOrganization(e.target.value);
    onOrganizationSelect(e.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor="region">Выберите область: </label>
        <select
          id="region"
          value={selectedRegion || ''}
          onChange={handleRegionChange}
        >
          <option value="" disabled>
            -- Регион --
          </option>
          {regions.map((region) => (
            <option key={region.id} value={region.id}>
              {region.region_name}
            </option>
          ))}
        </select>
      </div>

      {selectedRegion && (
        <div>
          <label htmlFor="organization">Выберите Организацию: </label>
          <select
            id="organization"
            value={selectedOrganization || ''}
            onChange={handleOrganizationChange}
          >
            <option value="" disabled>
              -- Организация --
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
