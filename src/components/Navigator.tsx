/*
 * @Author: Mr.Car
 * @Date: 2025-09-01 23:27:52
 */
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Navigator = () => {
  return (
    <nav className="w-full flex items-center justify-between px-6 bg-gray-100 border-b border-gray-200">
      {/* Logo左侧 */}
      <div className="flex items-center">
        <Image
          className="dark:invert"
          src="/logo.jpg"
          alt="mindShowlogo"
          width={50}
          height={50}
          priority
        />
      </div>
      
      {/* Button右侧 */}
      <div className="flex items-center">
        <Button variant="default" size="default">
          Connect Web3
        </Button>
      </div>
    </nav>
  );
};

export default Navigator;
