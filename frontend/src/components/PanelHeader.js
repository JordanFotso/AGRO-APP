import React from 'react';

export default function PanelHeader({ title, children }) {
  return (
    <div className="panel-header">
      <h2 className="panel-title">{title}</h2>
      <div className="panel-header-search">{children}</div>
    </div>
  );
}