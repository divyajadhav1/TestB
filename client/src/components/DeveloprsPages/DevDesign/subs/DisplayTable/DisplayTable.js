import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { Div } from 'basedesign-iswad';
import Image from 'next/image';

import Button from '@/baseComponents/ReusableComps/Button';
import Table from '@/baseComponents/ReusableComps/Table';
import Search from '@/baseComponents/ReusableComps/Search';

import { headLines, data } from './utils';

import styles from '../../DevDesign.module.scss';

function DisplayTable() {
  const [tableData, setTableData] = useState([]);

  const genderConverter = (gender) => {
    if (gender === 'Male') {
      return (
        <Image
          src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/60/000000/external-man-back-to-school-vitaliy-gorbachev-lineal-color-vitaly-gorbachev-2.png"
          width={30}
          height={30}
        />
      );
    } else if (gender === 'Female') {
      return (
        <Image
          src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/60/000000/external-woman-back-to-school-vitaliy-gorbachev-lineal-color-vitaly-gorbachev-2.png"
          width={30}
          height={30}
        />
      );
    } else {
      return (
        <Image
          src="https://img.icons8.com/pastel-glyph/64/000000/person-male--v1.png"
          width={30}
          height={30}
        />
      );
    }
  };

  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    data.map((d) => {
      d['gender'] = {
        value: d['gender'],
        display: genderConverter(d['gender'])
      };
    });
  }, [data]);

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  // useEffect(() => {
  //   console.log(selectedData);
  // }, [selectedData]);

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <Div
        type="flex"
        direction="vertical"
        hAlign="center"
        vAlign="center"
        className={cx('width-per-90 flex--wrap', styles.card)}>
        <Table
          headLines={headLines(Div, Search, setTableData, data, setCurrentPage)}
          data={tableData}
          //   colWidth={400}
          //   tableWidth={'2025px'}
          isSelectable={true}
          selectedData={selectedData}
          setSelectedData={setSelectedData}
          sortIconColors={{ ASC: 'green', DESC: 'red', REG: 'silver' }}
          rowsPerPage={10}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          numberOfShownPages={5}
          isFullWidth={true}
        />
        <Button
          onClick={() => setCurrentPage(currentPage + 1)}
          className={'width-px-300 m-t-16 m-l-auto m-r-auto'}>
          Next Page
        </Button>
      </Div>
    </>
  );
}

export default DisplayTable;
