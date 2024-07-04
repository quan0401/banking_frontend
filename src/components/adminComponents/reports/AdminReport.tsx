import { FC, ReactElement, useState, Dispatch, SetStateAction } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {
  formatCamelCaseToTitle,
  formatLargeNumber,
} from "@utils/utils.service";
import { isNumber } from "lodash";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface IAdminReport {
  data: any[];
  highlight?: number[];
  rowLimit?: number;
  total?: number;
  pagination?: { limit: number; offset: number };
  setPagination?: Dispatch<SetStateAction<{ limit: number; offset: number }>>;
}

const AdminReport: FC<IAdminReport> = ({
  data,
  highlight = [],
  pagination,
  setPagination,
  total,
}): ReactElement => {
  const [visibleRows, setVisibleRows] = useState(pagination?.limit || 5);
  const [visibleShowLess, setVisibleShowLess] = useState(false);
  const navigate: NavigateFunction = useNavigate();

  data = data.map((row, index) => {
    return { number: index + 1, ...row };
  });

  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  const handleShowMore = () => {
    setVisibleRows((prevVisibleRows) => prevVisibleRows + 5); // Or set to data.length to show all
    setVisibleShowLess(true);
  };

  const handleShowLess = () => {
    setVisibleRows(pagination?.limit || 5);
    setVisibleShowLess(false);
  };

  const handlePagination = () => {
    if (setPagination && pagination) {
      setVisibleRows((prevVisibleRows) => prevVisibleRows + pagination.limit);
      setVisibleShowLess(true);
      // return to handle case when user already call more data then showless -> then call more again
      if (visibleRows < data.length) return;
      setPagination({
        ...pagination,
        offset: pagination.offset + pagination.limit,
      });
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header} align="left">
                  {header === "linkTarget"
                    ? formatCamelCaseToTitle("Click to view")
                    : formatCamelCaseToTitle(header)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(0, visibleRows).map((row, rowIndex) => {
              return (
                <TableRow
                  key={rowIndex}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    backgroundColor: highlight.includes(rowIndex)
                      ? "#ffecb3"
                      : "inherit",
                  }}
                >
                  {headers.map((header) => {
                    let value = row[header];
                    if (isNumber(row[header])) {
                      value = formatLargeNumber(value);
                    }
                    return (
                      <TableCell
                        key={header}
                        align="left"
                        sx={{
                          ...(header === "number"
                            ? {
                                width: "36px", // Smaller width for orderNumber
                                maxWidth: "36px", // Ensuring it doesn't exceed the specified width
                                padding: "6px 10px", // Reduced padding
                              }
                            : {
                                paddingTop: "12px",
                                paddingBottom: "12px",
                                maxWidth: {
                                  xs: "100%", // 100% width on extra-small screens (phones)
                                  sm: "150px", // 150px maxWidth on small screens (tablets)
                                  md: "120px", // 120px maxWidth on medium screens (small laptops)
                                  lg: "200px", // 200px maxWidth on large screens (desktops)
                                  xl: "250px", // 250px maxWidth on extra-large screens (large desktops)
                                },
                                overflowX: "auto",
                                whiteSpace: "nowrap",
                                "&::-webkit-scrollbar": {
                                  height: "8px",
                                },
                                "&::-webkit-scrollbar-track": {
                                  backgroundColor: "transparent",
                                },
                                "&::-webkit-scrollbar-thumb": {
                                  backgroundColor: "darkgrey",
                                  borderRadius: "2px",
                                },
                              }),
                        }}
                      >
                        {header === "linkTarget" ? (
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => navigate(value)}
                          >
                            View
                          </Button>
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {total ? (
        <>
          {visibleRows < total && (
            <Button
              onClick={handlePagination}
              variant="contained"
              style={{ marginTop: "10px" }}
            >
              Show More
            </Button>
          )}
          {visibleShowLess && (
            <Button
              onClick={handleShowLess}
              variant="contained"
              style={{ marginTop: "10px", marginLeft: "10px" }}
            >
              Show Less
            </Button>
          )}
        </>
      ) : (
        <>
          {visibleRows < data.length && (
            <Button
              onClick={handleShowMore}
              variant="contained"
              style={{ marginTop: "10px" }}
            >
              Show More
            </Button>
          )}
          {visibleShowLess && (
            <Button
              onClick={handleShowLess}
              variant="contained"
              style={{ marginTop: "10px", marginLeft: "10px" }}
            >
              Show Less
            </Button>
          )}
        </>
      )}
    </>
  );
};

export default AdminReport;
