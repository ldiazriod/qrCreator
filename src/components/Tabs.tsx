import React from 'react';
import styled from 'styled-components';

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: { label: string; value: string }[];
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <TabContainer>
      {tabs.map(tab => (
        <TabButton
          key={tab.value}
          $active={activeTab === tab.value}
          onClick={() => setActiveTab(tab.value)}
        >
          {tab.label}
        </TabButton>
      ))}
    </TabContainer>
  );
};

export default Tabs;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const TabButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  background-color: ${props => props.$active ? '#3B82F6' : '#E5E7EB'};
  color: ${props => props.$active ? 'white' : 'black'};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  height: 100%;

  &:first-child {
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
  }

  &:last-child {
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
`;