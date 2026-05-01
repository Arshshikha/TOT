import React, { createContext, useContext, useState } from "react";

export type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED";

export interface Ticket {
  id: string;
  issueType: string;
  description: string;
  status: TicketStatus;
  createdAt: string;
}

interface TicketContextType {
  tickets: Ticket[];
  addTicket: (ticket: Ticket) => void;
}

const TicketContext = createContext<TicketContextType | null>(null);

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "TOT-1001",
      issueType: "PAYMENT",
      description: "Refund not received yet",
      status: "RESOLVED",
      createdAt: new Date().toISOString(),
    },
  ]);

  const addTicket = (ticket: Ticket) => {
    setTickets((prev) => [ticket, ...prev]);
  };

  return (
    <TicketContext.Provider value={{ tickets, addTicket }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => {
  const ctx = useContext(TicketContext);
  if (!ctx) throw new Error("useTickets must be used inside TicketProvider");
  return ctx;
};
