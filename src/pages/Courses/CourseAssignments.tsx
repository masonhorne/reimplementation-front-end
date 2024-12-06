import { Row as TRow } from "@tanstack/react-table";
import Table from "components/Table/Table";
import React from 'react';
import { assignmentColumns as getBaseAssignmentColumns } from "../Assignments/AssignmentColumns";

interface ActionHandler {
  icon: string;
  label: string;
  handler: (row: TRow<any>) => void;
  className?: string;
}

interface CourseAssignmentsProps {
  courseId: number;
  courseName: string;
}

const CourseAssignments: React.FC<CourseAssignmentsProps> = ({ courseId, courseName }) => {
  const actionHandlers: ActionHandler[] = [
    {
      icon: '/assets/icons/edit-temp.png',
      label: 'Edit',
      handler: (row: TRow<any>) => {
        console.log('Edit assignment:', row.original);
      },
      className: 'text-primary'
    },
    {
      icon: '/assets/icons/delete-temp.png',
      label: 'Delete',
      handler: (row: TRow<any>) => {
        console.log('Delete assignment:', row.original);
      },
      className: 'text-danger'
    },
    {
      icon: '/assets/icons/add-participant-24.png',
      label: 'Add Participant',
      handler: (row: TRow<any>) => {
        console.log('Add participant to assignment:', row.original);
      },
      className: 'text-success'
    },
    {
      icon: '/assets/icons/assign-reviewers-24.png',
      label: 'Assign Reviewers',
      handler: (row: TRow<any>) => {
        console.log('Assign reviewers for:', row.original);
      },
      className: 'text-info'
    },
    {
      icon: '/assets/icons/create-teams-24.png',
      label: 'Create Teams',
      handler: (row: TRow<any>) => {
        console.log('Create teams for:', row.original);
      },
      className: 'text-primary'
    },
    {
      icon: '/assets/icons/view-review-report-24.png',
      label: 'View Review Report',
      handler: (row: TRow<any>) => {
        console.log('View review report:', row.original);
      },
      className: 'text-secondary'
    },
    {
      icon: '/assets/icons/view-scores-24.png',
      label: 'View Scores',
      handler: (row: TRow<any>) => {
        console.log('View scores:', row.original);
      },
      className: 'text-info'
    },
    {
      icon: '/assets/icons/view-submissions-24.png',
      label: 'View Submissions',
      handler: (row: TRow<any>) => {
        console.log('View submissions:', row.original);
      },
      className: 'text-secondary'
    },
    {
      icon: '/assets/icons/copy-temp.png',
      label: 'Copy Assignment',
      handler: (row: TRow<any>) => {
        console.log('Copy assignment:', row.original);
      },
      className: 'text-success'
    },
    {
      icon: '/assets/icons/export-temp.png',
      label: 'Export',
      handler: (row: TRow<any>) => {
        console.log('Export assignment:', row.original);
      },
      className: 'text-primary'
    }
  ];

  const generateFakeAssignments = () => {
    const numAssignments = 3 + Math.floor(Math.random() * 3);
    return Array.from({ length: numAssignments }, (_, idx) => ({
      id: parseInt(`${courseId}${idx}`),
      name: `Assignment ${idx + 1} for ${courseName}`,
      courseName: courseName,
      description: "This is a fake assignment",
      created_at: new Date(Date.now() - Math.random() * 10000000000).toISOString().slice(0, 16).replace('T', ' '),
      updated_at: new Date().toISOString().slice(0, 16).replace('T', ' '),
    }));
  };

  const getAssignmentColumns = (actions: ActionHandler[]) => {
    const baseColumns = getBaseAssignmentColumns(() => {}, () => {}).filter(col => 
      !['edit', 'delete', 'actions'].includes(String(col.id))
    );
    
    const actionsColumn = {
		id: 'actions',
		header: 'Actions',
		cell: ({ row }: { row: TRow<any> }) => (
		  <div className="d-flex gap-1" style={{ minWidth: 'max-content' }}>
			{actions.map((action, index) => (
			  <button
				key={index}
				onClick={() => action.handler(row)}
				className="btn btn-link p-0"
				title={action.label}
				style={{ lineHeight: 0 }}
			  >
				<img 
				  src={action.icon} 
				  alt={action.label} 
				  width="21" 
				  height="21"
				/>
			  </button>
			))}
		  </div>
		)
	  };

    return [...baseColumns, actionsColumn];
  };

  const assignments = generateFakeAssignments();
  const columns = getAssignmentColumns(actionHandlers);

  return (
    <div className="px-4 py-2 bg-light">
      <h5 className="mb-3">Assignments for {courseName}</h5>
      <Table
        data={assignments}
        columns={columns}
        showGlobalFilter={false}
        showColumnFilter={false}
        showPagination={false}
        tableSize={{ span: 12, offset: 0 }}
      />
    </div>
  );
};

export default CourseAssignments;