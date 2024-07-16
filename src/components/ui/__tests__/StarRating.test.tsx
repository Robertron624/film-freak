//@ts-expect-error prevent build error
import React from "react";
import StarRating from "../StarRating";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

describe('StarRating', () => {
    it('renders full stars for a whole number rating', () => {
      render(<StarRating rating={8} />);
      expect(screen.getAllByTestId('star-full')).toHaveLength(4);
      expect(screen.getAllByTestId('star-empty')).toHaveLength(1);
      expect(screen.queryByTestId('star-half')).toBeNull();
    });
  
    it('renders half star for a rating with decimal value', () => {
      render(<StarRating rating={6.5} />);
      expect(screen.getAllByTestId('star-full')).toHaveLength(3);
      expect(screen.getAllByTestId('star-half')).toHaveLength(1);
      expect(screen.getAllByTestId('star-empty')).toHaveLength(1);
    });
  
    it('renders empty stars for a rating with decimal value', () => {
      render(<StarRating rating={3.7} />);
      expect(screen.getAllByTestId('star-full')).toHaveLength(1);
      expect(screen.getAllByTestId('star-half')).toHaveLength(1);
      expect(screen.getAllByTestId('star-empty')).toHaveLength(3);
    });
});