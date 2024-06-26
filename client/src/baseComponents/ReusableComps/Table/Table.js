import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { Div, Table as BaseTable } from 'basedesign-iswad';

import DivWidthDynamic from '@/baseComponents/ReusableComps/DivWidthDynamic';
import Search from '@/baseComponents/ReusableComps/Search';
import Pagination from '@/baseComponents/ReusableComps/Pagination';

import SortIcon from './subs/SortIcon';
import SelectableComp from './subs/SelectableComp';
import styles from './Table.module.scss';

const Table = ({ className, headLines, data, isFullWidth, ...props }) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [updatedHeadLines, setUpdatedHeadLines] = useState([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    if (headLines?.length && isFullWidth) {
      let totalWidth = 0;
      headLines.forEach((col) => {
        if (col?.width) {
          totalWidth += col.width;
        }
      });
      let addedPx = 0;
      if (totalWidth < containerWidth) {
        addedPx = (containerWidth - totalWidth) / headLines.length;
      }
      if (addedPx > 0) {
        const localHeadLines = [];
        headLines.forEach((col) => {
          localHeadLines.push({ ...col, width: col.width + addedPx });
        });
        setUpdatedHeadLines([...localHeadLines]);
      } else {
        const localHeadLines = [];
        headLines.forEach((col) => {
          localHeadLines.push({ ...col, width: col.width });
        });
        setUpdatedHeadLines([...localHeadLines]);
      }
    }
  }, [headLines, isFullWidth, containerWidth]);

  useEffect(() => {
    if (data?.[0]) {
      if (Object.keys(data[0])?.length > 1) {
        setShowTable(true);
      }
    }
  }, [data]);

  const paginationComponent = (props) => (
    <Div className="m-t-32">
      <Pagination {...props} />
    </Div>
  );
  const sortIcon = (props) => <SortIcon {...props} />;
  const search = (props) => <Search {...props} />;
  const selectableComp = (props) => <SelectableComp {...props} />;
  return (
    <>
      <DivWidthDynamic
        setContainerWidth={setContainerWidth}
        className="width-per-100 of-x-auto scroll-type-one">
        {showTable ? (
          <BaseTable
            tableClassName={cx(styles.container)}
            mainContainerClassName=""
            tableHeadContainerClassName={cx(styles.headContainer)}
            thClassName={styles.th}
            trClassName={styles.tr}
            tdClassName={styles.td}
            className={cx('scroll-type-one', className)}
            showDefaultPagination={false}
            paginationComponent={paginationComponent}
            showDefaultSortIcon={false}
            sortIcon={sortIcon}
            search={search}
            showDefaultSelectable={false}
            selectableComp={selectableComp}
            selectableColWidth={40}
            selectableHeaderClassName={cx(styles.selectable)}
            selectableRowClassName={cx(styles.selectable)}
            headLines={updatedHeadLines?.length ? updatedHeadLines : headLines}
            data={data}
            {...props}
          />
        ) : (
          ''
        )}
      </DivWidthDynamic>
    </>
  );
};

export default Table;
