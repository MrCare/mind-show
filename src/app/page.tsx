/*
 * @Author: Mr.Car
 * @Date: 2025-07-16 14:11:12
 */
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-center">
        <Image
          className="dark:invert"
          src="/logo.jpg"
          alt="mindShowlogo"
          width={180}
          height={38}
          priority
        />
      </main>
    </div>
  );
}
