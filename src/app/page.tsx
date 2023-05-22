'use client'
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import s from './page.module.scss';
import Link from 'next/link';
import { UseAppSelector } from '@/hooks/redux';
import { ITest } from '@/store/testReducer/typesReducer';

export default function Home() {
  const [ searchValue, setSearchValue] = useState('');
  const [ text ] = useDebounce(searchValue, 500);
  const { tests } = UseAppSelector((state) => state.testReducer);
  const [ listOfTests, setListOfTests] = useState<ITest[]>(tests);

  useEffect(() => {
    if (text.length) {
      const filteredTests = tests.filter(
        (test) => test.title.toLocaleLowerCase().includes(text.toLocaleLowerCase())
      );

      setListOfTests(filteredTests);
    } else {
      setListOfTests(tests);
    }
  }, [text])

  return (
    <>
      <div className={s.titleContainer}>
        <h1 className={s.title}>
          Test creator
        </h1>
        <Link href="/create-new-test">
          Add new Test
        </Link>
      </div>
      <input
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
        className={s.search}
        placeholder="Enter the user login..."
      />
      <ul className={s.listOfUsers}>
        {!!listOfTests && listOfTests.map((item) => (
          <li
            key={item.testId}
          >
            <Link href={`/test/${item.testId}`} className={s.listOfUsers__user}>
              <span>{item.title}</span>
              <div style={{width: "50px", height: "50px"}}>
                <img width={50} height={50} src={'https://avatars.githubusercontent.com/u/86207804?v=4'} alt={`${item.title}`}/>
              </div>
              <span>Test Id: {item.testId.slice(0, 4)}</span>
            </Link>
          </li>
        ))}
        {!listOfTests && 
          <div className='list-of-users__do-not-know-text'>
            I do not know what i should do here, so let it be here
          </div>
        }
      </ul>
      <span style={{visibility: 'hidden'}}>0</span>
      </>
  );
}
