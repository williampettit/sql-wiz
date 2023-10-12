type SqlConceptType = "simple" | "complex";

type SqlConcept = {
  name: string;
  type: SqlConceptType;
  description: string;
};

type SqlConcepts = readonly SqlConcept[];

export const SQL_CONCEPTS: SqlConcepts = [
  {
    name: "SELECT",
    description: "To retrieve data from one or more tables.",
    type: "simple",
  },
  {
    name: "WHERE",
    description: "To filter the results of a query based on a condition.",
    type: "simple",
  },
  {
    name: "AND / OR",
    description:
      "To combine multiple conditions in the WHERE clause, specifying how they should be used together to filter data.",
    type: "simple",
  },
  {
    name: "ORDER BY",
    description:
      "To sort the results of a query according to one or more columns.",
    type: "simple",
  },
  {
    name: "AVG",
    description: "To calculate the average value of a numerical column.",
    type: "simple",
  },
  {
    name: "COUNT",
    description:
      "To determine the number of rows that match specified criteria.",
    type: "simple",
  },
  {
    name: "ALIAS",
    description:
      "To temporarily rename a column or table in the output of a SQL query.",
    type: "complex",
  },
  {
    name: "LIKE",
    description:
      "To filter results based on pattern matching, often used with wildcards (% and _).",
    type: "complex",
  },
  {
    name: "SELECT with a calculation",
    description:
      "To perform a calculation (like addition, subtraction, etc.) in the select list, usually involving column values.",
    type: "complex",
  },
  {
    name: "CASE",
    description:
      "To perform conditional logic (if-else logic) in SQL, providing different outputs in the SELECT, WHERE, or ORDER BY clauses.",
    type: "complex",
  },
  {
    name: "IIF",
    description:
      "To evaluate a condition and return one of two values, effectively a shorthand for a CASE expression.",
    type: "complex",
  },
  {
    name: "HAVING",
    description:
      "To filter grouped data, often used with aggregate functions like COUNT, SUM, etc.",
    type: "complex",
  },
  {
    name: "JOIN",
    description:
      "To combine rows from two or more tables based on a related column between them.",
    type: "complex",
  },
  {
    name: "Sub-queries (nested SQL)",
    description:
      "To embed a SELECT statement within another SQL query, often within the WHERE or HAVING clause.",
    type: "complex",
  },
  {
    name: "Correlated sub-queries (nested SQL which references outer SQL)",
    description:
      "To utilize sub-queries that reference columns of the outer query.",
    type: "complex",
  },
  {
    name: "View",
    description:
      "To create a virtual table that represents the results of a SELECT query, which can be reused in future queries.",
    type: "complex",
  },
  {
    name: "WITH / CTE (Common Table Expressions)",
    description:
      "To create a temporary result set that can be referenced within a SELECT, INSERT, UPDATE, or DELETE statement.",
    type: "complex",
  },
  {
    name: "GROUP BY",
    description:
      "To arrange identical data into summary rows, often used with aggregate functions to analyze the grouped data.",
    type: "complex",
  },
  {
    name: "RANK",
    description:
      "To assign a ranking to each row within a result set, based on specified column values.",
    type: "complex",
  },
  {
    name: "Local variables",
    description:
      "To store data that can be used later in the code, allowing for stored values to be reused in other parts of your SQL code.",
    type: "complex",
  },
  {
    name: "Functions",
    description:
      "To execute a sequence of statements, accepting parameters, returning a value, and encapsulating complex logic to simplify SQL queries.",
    type: "complex",
  },
] as const;
