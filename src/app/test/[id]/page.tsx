"use client"
import ReadTest from "./components/ReadTest";
import { usePathname } from 'next/navigation';

export default function Test() {
	const pathName = usePathname()
	const splittedPath = pathName.split('/');
	
	return (
		<ReadTest id={splittedPath[splittedPath.length - 1]} />
	);
}